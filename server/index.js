const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;
const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const niceList = require("../utils/niceList.json");
const theTree = new MerkleTree(niceList);
const merkle_root = theTree.getRoot();

// const name = "Traci McDermott";
// const index = niceList.findIndex((n) => n === name);
// console.log(theTree.getProof(index));

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  console.log({ body });
  const { proof, leaf: name } = body.data;

  // TODO: prove that a name is in the list
  console.log({ proof });
  const isInTheList = verifyProof(proof, name, merkle_root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
