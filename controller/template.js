exports.fetchProj = async (req, res) => {
  const projName = req.params.projectName;
  const fe = req.params.frontEnd;
  const be = req.params.backEnd;
  const db = req.params.db;

  const README_FILE = "README.md";

  let dirPathFe = __dirname + "/../public/" + fe + "_fe";
  let dirPathBe = __dirname + "/../public/" + be + "_" + db + "_be";
  let dirPathREADME = __dirname + "/../public/" + README_FILE;

  try {
    await res.zip({
      files: [
        {
          path: dirPathREADME,
          name: README_FILE,
        },
        {
          path: dirPathFe,
          name: `${fe}_fe`,
        },
        {
          path: dirPathBe,
          name: `${be}_${db}_be`,
        },
      ],
      filename: `${projName}.zip`,
    });
  } catch (error) {
    res.status(404).send("Invalid input.");
  }
};
