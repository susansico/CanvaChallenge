// clientInit.js

function initializeClient() {

    // Serve HTML file.
    let path = "http://localhost:8765/";
    fetchGetFile(path);

    // Serve client directory files.
    path = "http://localhost:8765/client/*";
    fetchGetFile(path);

    let buttonElements = document.getElementsByTagName("button");
    buttonElements[0].addEventListener("click", function() {startTournament("teamsPerMatch", "numberOfTeams");}, false);
}
