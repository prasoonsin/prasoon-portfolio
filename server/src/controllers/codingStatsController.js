const CodingStats = require("../models/CodingStats");

// =====================================================
// LEETCODE CONFIG
// =====================================================

const LEETCODE_USERNAME = "fjTAMtDvp0";


// =====================================================
// FETCH LIVE LEETCODE STATS
// =====================================================

const getLeetCodeStats = async () => {

  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username

        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;


  const response = await fetch(
    "https://leetcode.com/graphql",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        "Referer": `https://leetcode.com/u/${LEETCODE_USERNAME}/`
      },

      body: JSON.stringify({
        query,
        variables: {
          username: LEETCODE_USERNAME
        }
      })
    }
  );


  // ===================================================
  // CHECK RESPONSE
  // ===================================================

  if (!response.ok) {
    throw new Error(
      `LeetCode API returned ${response.status}`
    );
  }


  const result = await response.json();


  // ===================================================
  // CHECK GRAPHQL ERRORS
  // ===================================================

  if (result.errors) {
    throw new Error(
      result.errors[0]?.message ||
      "LeetCode GraphQL error"
    );
  }


  // ===================================================
  // CHECK USER
  // ===================================================

  const matchedUser =
    result?.data?.matchedUser;


  if (!matchedUser) {
    throw new Error(
      "LeetCode user not found"
    );
  }


  // ===================================================
  // GET SUBMISSION DATA
  // ===================================================

  const submissions =
    matchedUser
      ?.submitStatsGlobal
      ?.acSubmissionNum;


  if (!Array.isArray(submissions)) {
    throw new Error(
      "Unable to retrieve LeetCode statistics"
    );
  }


  // ===================================================
  // GET ALL DIFFICULTIES
  // ===================================================

  const totalSolved = submissions.find(
    (item) => item.difficulty === "All"
  );

  const easySolved = submissions.find(
    (item) => item.difficulty === "Easy"
  );

  const mediumSolved = submissions.find(
    (item) => item.difficulty === "Medium"
  );

  const hardSolved = submissions.find(
    (item) => item.difficulty === "Hard"
  );


  // ===================================================
  // CREATE LIVE STATS OBJECT
  // ===================================================

  const liveStats = {

    username: matchedUser.username,

    problems_solved: Number(
      totalSolved?.count || 0
    ),

    easy: Number(
      easySolved?.count || 0
    ),

    medium: Number(
      mediumSolved?.count || 0
    ),

    hard: Number(
      hardSolved?.count || 0
    )

  };


  // ===================================================
  // DEBUG
  // ===================================================

  console.log("");
  console.log("========================================");
  console.log("LIVE LEETCODE STATS");
  console.log("========================================");
  console.log(liveStats);
  console.log("========================================");
  console.log("");


  return liveStats;
};


// =====================================================
// GET ALL CODING STATISTICS
// =====================================================

const getCodingStats = async (
  req,
  res,
  next
) => {

  try {

    // -----------------------------------------------
    // Get database records
    // -----------------------------------------------

    const stats =
      await CodingStats.getAllCodingStats();


    // -----------------------------------------------
    // Find LeetCode record
    // -----------------------------------------------

    const leetCodeRecord =
      stats.find(
        (item) =>
          item.platform?.toLowerCase() ===
          "leetcode"
      );


    // -----------------------------------------------
    // If LeetCode record exists
    // fetch live statistics
    // -----------------------------------------------

    if (leetCodeRecord) {

      try {

        const leetCodeStats =
          await getLeetCodeStats();


        // -------------------------------------------
        // Update database
        // -------------------------------------------

        await CodingStats.updateCodingStats(
          leetCodeRecord.id,
          {
            platform:
              leetCodeRecord.platform,

            username:
              leetCodeStats.username,

            profile_url:
              leetCodeRecord.profile_url,

            problems_solved:
              leetCodeStats.problems_solved,

            rating:
              leetCodeRecord.rating
          }
        );


        // -------------------------------------------
        // Create response
        // -------------------------------------------

        const updatedStats =
          stats.map((item) => {

            if (
              item.platform?.toLowerCase() ===
              "leetcode"
            ) {

              return {

                ...item,

                username:
                  leetCodeStats.username,

                problems_solved:
                  leetCodeStats.problems_solved,

                easy:
                  leetCodeStats.easy,

                medium:
                  leetCodeStats.medium,

                hard:
                  leetCodeStats.hard,

                updated_at:
                  new Date()

              };

            }

            return item;

          });


        return res.status(200).json({
          success: true,
          data: updatedStats
        });

      } catch (leetcodeError) {

        console.error(
          "LeetCode API Error:",
          leetcodeError.message
        );


        // -------------------------------------------
        // Fallback
        // -------------------------------------------

        return res.status(200).json({
          success: true,
          data: stats
        });

      }

    }


    // -----------------------------------------------
    // No LeetCode record
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {

    next(error);

  }
};


// =====================================================
// GET CODING STATISTICS BY ID
// =====================================================

const getCodingStatsById = async (
  req,
  res,
  next
) => {

  try {

    const stats =
      await CodingStats.getCodingStatsById(
        req.params.id
      );


    // -----------------------------------------------
    // Record not found
    // -----------------------------------------------

    if (!stats) {

      return res.status(404).json({
        success: false,
        message:
          "Coding statistics not found"
      });

    }


    // -----------------------------------------------
    // LIVE LEETCODE UPDATE
    // -----------------------------------------------

    if (
      stats.platform?.toLowerCase() ===
      "leetcode"
    ) {

      try {

        const leetCodeStats =
          await getLeetCodeStats();


        // -------------------------------------------
        // Update database
        // -------------------------------------------

        await CodingStats.updateCodingStats(
          stats.id,
          {
            platform:
              stats.platform,

            username:
              leetCodeStats.username,

            profile_url:
              stats.profile_url,

            problems_solved:
              leetCodeStats.problems_solved,

            rating:
              stats.rating
          }
        );


        // -------------------------------------------
        // Update response
        // -------------------------------------------

        stats.username =
          leetCodeStats.username;

        stats.problems_solved =
          leetCodeStats.problems_solved;

        stats.easy =
          leetCodeStats.easy;

        stats.medium =
          leetCodeStats.medium;

        stats.hard =
          leetCodeStats.hard;

      } catch (leetcodeError) {

        console.error(
          "LeetCode API Error:",
          leetcodeError.message
        );

      }

    }


    // -----------------------------------------------
    // Return response
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {

    next(error);

  }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getCodingStats,
  getCodingStatsById
};