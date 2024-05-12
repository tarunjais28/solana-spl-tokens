import {
  addSubAdmins,
  fetchMaintainers,
  fetchBalances,
  buyWithSol,
  getIcoBaseKeys,
  fetchContractBalances,
  setConfig,
  setEscrow,
  initIcoProgram,
  initIcoResources,
} from "./ico";

import {
  initReceiverProgram,
  getReceiverBaseKeys,
  receive,
  fetchUsers,
} from "./receiver";

const callTheFunction = async () => {
  console.log("Triggering functions , please wait !");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // await initIcoProgram();
  // await initIcoResources();
  // await fetchMaintainers();
  // await addSubAdmins();
  // await createToken();
  // await setEscrow();
  // await setConfig();
  // await mint();
  // await fetchBalances();
  await buyWithSol();
  // await getIcoBaseKeys();
  // await fetchContractBalances();

  // await initReceiverProgram();
  // await getReceiverBaseKeys();
  // await receive();
  // await fetchUsers();

  console.log("Functions Triggered, success !");
  console.log("sent =>>>>>>>>");
  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // ==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
};

callTheFunction();

// npm start run
