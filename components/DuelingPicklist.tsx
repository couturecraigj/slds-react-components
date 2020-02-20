import Svg from "./Svg";
import React, { useState } from "react";

type OptionType = {
  label: string;
  value?: string;
  id?: string;
};

const convertOption = (option: OptionType | string) => {
  let label = "";
  let value = "";
  let id = "";
  if (typeof option === "string") {
    label = option;
    value = option;
    id = option;
  } else {
    label = option.label;
    value = option.value || label;
    id = option.id || value;
  }
  return { label, value, id };
};

const DuelingPicklist = ({
  options = [],
  label
}: {
  label: string;
  options: Array<OptionType | string>;
}) => {
  const referenceOptions = options.map(convertOption);
  const [selected, setSelected] = useState();
  const [chosen, setChosen] = useState<Array<string>>([]);

  return (
    <div
      className="slds-form-element"
      role="group"
      aria-labelledby="picklist-group-label"
    >
      <span
        id="picklist-group-label"
        className="slds-form-element__label slds-form-element__legend"
      >
        {label}
      </span>
      <div className="slds-form-element__control">
        <div className="slds-dueling-list">
          <div
            className="slds-assistive-text"
            id="drag-live-region"
            aria-live="assertive"
          ></div>
          <div className="slds-assistive-text" id="option-drag-label">
            Press space bar when on an item, to move it within the list. CMD
            plus left and right arrow keys, to move items between lists.
          </div>
          <div className="slds-dueling-list__column">
            <span className="slds-form-element__label" id="label-103">
              Options
            </span>
            <div className="slds-dueling-list__options">
              <ul
                aria-describedby="option-drag-label"
                aria-labelledby="label-103"
                aria-multiselectable="false"
                className="slds-listbox slds-listbox_vertical"
                role="listbox"
              >
                {referenceOptions.map(({ id, value, label }) => {
                  if (chosen.includes(value)) return null;
                  return (
                    <li
                      key={id}
                      role="presentation"
                      className="slds-listbox__item"
                    >
                      <div
                        className="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"
                        aria-selected={selected === value}
                        draggable="true"
                        role="option"
                        onClick={() => setSelected(value)}
                        tabIndex={0}
                      >
                        <span className="slds-media__body">
                          <span className="slds-truncate" title={label}>
                            {label}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="slds-dueling-list__column">
            <button
              className="slds-button slds-button_icon slds-button_icon-container"
              title="Move Selection to Selected"
              onClick={() => setChosen([...chosen, selected])}
              type="button"
            >
              <Svg xlinkHref="/icons/utility-sprite/svg/symbols.svg#right" />
              <span className="slds-assistive-text">
                Move Selection to Selected
              </span>
            </button>
            <button
              className="slds-button slds-button_icon slds-button_icon-container"
              type="button"
              onClick={() =>
                setChosen(
                  chosen.filter(
                    option => convertOption(option).value !== selected
                  )
                )
              }
              title="Move Selection to Options"
            >
              <Svg xlinkHref="/icons/utility-sprite/svg/symbols.svg#left" />
              <span className="slds-assistive-text">
                Move Selection to Options
              </span>
            </button>
          </div>
          <div className="slds-dueling-list__column">
            <span className="slds-form-element__label" id="label-104">
              Selected
            </span>
            <div className="slds-dueling-list__options">
              <ul
                aria-describedby="option-drag-label"
                aria-labelledby="label-104"
                aria-multiselectable="true"
                className="slds-listbox slds-listbox_vertical"
                role="listbox"
              >
                {referenceOptions.map(({ id, value, label }) => {
                  if (!chosen.includes(value)) return null;
                  return (
                    <li
                      key={id}
                      role="presentation"
                      className="slds-listbox__item"
                    >
                      <div
                        className="slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline"
                        aria-selected={selected === value}
                        draggable="true"
                        role="option"
                        onClick={() => setSelected(value)}
                        tabIndex={0}
                      >
                        <span className="slds-media__body">
                          <span className="slds-truncate" title={label}>
                            {label}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* 
          // IMPLEMENT THIS LATER
          <div className="slds-dueling-list__column">
            <button
              className="slds-button slds-button_icon slds-button_icon-container"
              title="Move Selection Up"
            >
              <Svg xlinkHref="/icons/utility-sprite/svg/symbols.svg#up" />
              <span className="slds-assistive-text">Move Selection Up</span>
            </button>
            <button
              className="slds-button slds-button_icon slds-button_icon-container"
              title="Move Selection Down"
            >
              <Svg xlinkHref="/icons/utility-sprite/svg/symbols.svg#down" />
              <span className="slds-assistive-text">Move Selection Down</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DuelingPicklist;
