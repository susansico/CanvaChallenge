// client.js

let teamScoresPath;

function startTournament(teamsPerMatchId, numberOfTeamsId) {

    let teamsPerMatch = document.getElementById(teamsPerMatchId).value;
    let numberOfTeams = document.getElementById(numberOfTeamsId).value;

    let path = "http://localhost:8765/tournament/?teamsPerMatch=" + teamsPerMatch + "&numberOfTeams=" + numberOfTeams + '"';
    let firstRoundMatchUps = fetchPost(path);
     
    determineFinalTournamentWinner(teamsPerMatch, numberOfTeams, firstRoundMatchUps);
}

function determineFinalTournamentWinner(teamsPerMatch, numberOfTeams, tournamentData) {

    let tournamentId = tournamentData.tournamentId;
    let matchUps = tournamentData.matchUps.slice();
    let path;
    let teamData;
    let teamDataIndex;
    let matchScore;

    let winnerScore;
    let squareIndex = 0;
    let rounds = determineNumberOfRounds(teamsPerMatch, numberOfTeams);
    let teamsPerCurrentRound = numberOfTeams;
    let matchesPerCurrentRound = teamsPerCurrentRound / teamsPerMatch;

    let totalNumberOfMatches = determineTotalNumberOfMatches(matchesPerCurrentRound, rounds);
    displaySquares(totalNumberOfMatches);

    for (let rIndex = 0, teamIdIndex = 0, matchUpIndex = 0; rIndex < rounds; rIndex++, teamsPerCurrentRound /= teamsPerMatch, matchesPerCurrentRound = teamsPerCurrentRound / teamsPerMatch) {

        for (let mIndex = 0; mIndex < matchesPerCurrentRound; mIndex++) {

            let teamDataArray = [];
            let teamScores = [];
            for (let tIndex= 0; tIndex < teamsPerMatch; tIndex++) {

                path = "http://localHost:8765/team?tournamentId=" + tournamentId + "&teamId=" + matchUps[mIndex].teamId[tIndex] + '"';
                teamData = fetchGetData(path);
                teamDataArray.push(new (teamData.id, teamData.name, teamData.score));
                teamScores.push(teamDataArray[tIndex].score);
            }

            path = "http://localHost:8765/match?tournamentId=" + tournamentId + "&round=" + rIndex + "&match=" + mIndex + '"';
            matchScore = fetchGetData(path);

            for (let i = 0; i < teamScores.length - 1; i++) {

                teamScoresPath += "&teamScores=" + teamScores[i] + "+";
            }
            teamScoresPath += "&teamScores=" + teamScores[i];
            path = "http://localHost:8765/winner?tournamentId=" + tournamentId + teamScoresPath + "&matchScore=" + matchScore + '"';
            
            winnerScore = fetchGetData(path);
            displayFilledSquare(squareIndex++);

            teamDataIndex = determineMatchWinner(winnerScore, teamScores);
            if (rIndex < rounds - 1)
                matchUps[teamIdIndex === teamsPerMatch ? matchUpIndex++ : matchUpIndex].teamId[teamIdIndex++] = teamDataArray[teamDataIndex].id;
            else displayText(teamDataArray[teamDataIndex].name);
        }
    }
}

function determineNumberOfRounds(teamsPerMatch, numberOfTeams) {

    let rounds = 1;

    for (let teamNum = teamsPerMatch; teamNum < numberOfTeams; teamNum *= teamsPerMatch) {

        rounds++;
    }

    return rounds;
}

function determineTotalNumberOfMatches(teamsPerMatch, rounds) {

    let totalNumberOfMatches = 0;
    let numberOfMatchesEachRound = teamsPerMatch;

    for (let i = 0; i < rounds; i++, Math.floor(numberOfMatchesEachRound /= teamsPerMatch)) {

        totalNumberOfMatches += numberOfMatchesEachRound;
    }

    return totalNumberOfMatches;
}

function determineTeamScoresPath(teamScores) {

    //let teamScoresPath = "";

    for (let i = 0; i < teamScores.length - 1; i++) {

        teamScoresPath += "&teamScores=" + teamScores[i] + "+";
    }
    teamScoresPath += "&teamScores=" + teamScores[i];
}

function determineMatchWinner(winnerScore, teamScores) {

    for (let i = 0; i < teamScores.length; i++) {

        if (teamScores[i] === winnerScore)
            return i;
    }
}
