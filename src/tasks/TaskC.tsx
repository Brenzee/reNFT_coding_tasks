import * as React from "react";

// Challenge 3
// I want to repeat the request several times with a predicate function
// and if it fails then do something else

interface StatusObject {
  status: string;
}

async function retryPromise(
  promise: Promise<StatusObject>,
  predicateFunction: (data: StatusObject) => true | undefined,
  retries: number
): Promise<StatusObject | undefined> {
  console.log(retries);
  try {
    const data = await promise;
    if (predicateFunction(data)) {
      return data;
    }
    throw new Error("Predicate function returned undefined");
  } catch (err) {
    // "retries" cannot be 0, that's why here is retries !== 0
    // If I would have put retries !== 0, it would run retries + 1 times
    if (retries !== 1) {
      return await retryPromise(promise, predicateFunction, retries - 1);
    } else {
      return undefined;
    }
  }
}

const isDefinedStatus = (data: StatusObject | undefined): true | undefined => {
  if (data && "status" in data && data.status === "200") {
    return true;
  } else {
    return undefined;
  }
};

// Change resolve/reject to affect the retryPromise function results
const getStatus = new Promise<StatusObject>((resolve, reject) => {
  setTimeout(() => {
    reject({
      status: "200",
    });
  }, 1000);
});

const TaskC: React.FC = () => {
  React.useEffect(() => {
    retryPromise(getStatus, isDefinedStatus, 3).then(isDefinedStatus);
  }, []);

  return <div></div>;
};

export default TaskC;
