import * as React from "react";
// Challenge 2
// Function takes an array and a predicate function as its parameters
// and returns a tuple of two arrays:
// 1) Array with elements that satisfied the predicate function
// 2) Another Array with elements that did not match the predicate function.

interface SelectOption {
  value: string;
  text: string;
}

const options: SelectOption[] = [
  {
    value: "bitcoin",
    text: "Bitcoin",
  },
  {
    value: "ethereum",
    text: "Ethereum",
  },
  {
    value: "avalanche",
    text: "Avalanche",
  },
  {
    value: "solana",
    text: "Solana",
  },
  {
    value: "chainlink",
    text: "Chainlink",
  },
];

/**
 * Filters provided options array and seperate them into two arrays:
 * 1. Options, that match predicateFunction
 * 2. Options, that doesn't match predicateFunction
 * @param {number} array Options array.
 * @param {number} predicateFunction Function that filters options array.
 * @return {Array} Array with two arrays - Array[0] = Selected options, Array[1] = Remaining options
 */
function partition(
  array: SelectOption[],
  predicateFunction: (option: SelectOption) => boolean
): [SelectOption[], SelectOption[]] {
  const selectedOptions = array.filter(predicateFunction);
  const remainingOptions = array.filter((option) => !predicateFunction(option));
  return [selectedOptions, remainingOptions];
}

const TaskB: React.FC = () => {
  const selectedValuesFromProps = ["bitcoin", "chainlink"]; // Example of selected values

  /**
   * Returns options value property
   * @param {SelectOption} option Option object
   * @return {String} Option value
   */
  const getSelectOptionValue = (option: SelectOption): string => {
    return option.value;
  };

  /*
  In the provided example predicate function's variable "option" was
  inside the array brackets. I suspect that it was a mistake and I removed
  the array brackets.
  */
  const [selectedOptions, remainingOptions]: [SelectOption[], SelectOption[]] =
    partition(options, (option: SelectOption) =>
      selectedValuesFromProps.includes(getSelectOptionValue(option))
    );

  return (
    <div style={{ width: "500px", margin: "0 auto" }}>
      <h2>Task B</h2>
      <div>
        <h3>Selected Options</h3>
        <div>{JSON.stringify(selectedOptions)}</div>
      </div>
      <div>
        <h3>Remaining Options</h3>
        <div>{JSON.stringify(remainingOptions)}</div>
      </div>
    </div>
  );
};

export default TaskB;
