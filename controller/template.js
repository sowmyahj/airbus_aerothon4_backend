exports.fetchProj = async (req, res) => {
  const projName = req.params.projectName;
  const fe = req.params.frontEnd;
  const be = req.params.backEnd;

  let dirPathFe = null;
  let dirPathBe = null;

  if (fe === "react") dirPathFe = __dirname + "/../public/react/react-app";
  if (be === "node") dirPathBe = __dirname + "/../public/node";

  if (be && fe) {
    await res.zip({
      files: [
        {
          // content: 'This is a test string',
          // name: 'test-file',
          // mode: 0755,
          // comment: 'comment-for-the-file - test file',
          // date: new Date(),
          // type: 'file'
        },
        {
          path: dirPathFe,
          name: `${fe}_fe`,
        },
        {
          path: dirPathBe,
          name: `${be}_be`,
        },
      ],
      filename: `${projName}.zip`,
    });
  } else {
    res.status(404).send("Invalid input.");
  }
};
