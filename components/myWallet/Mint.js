/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { totalSupply } from "../../utils/interact";
import styles from './wallet.module.css';

function Mint(props) {
  const [supply, setSupply] = useState(0);

  totalSupply().then((data) => {
    setSupply(data);
  });

  const RoundUp = (amount) => {
    props.setAmount(amount);
  };

  const Subtract = () => {
    if (props.amount > 1) {
      props.setAmount(parseInt(props.amount) - 1);
    }
  };

  const Add = () => {
    if (props.amount < 20) {
      props.setAmount(parseInt(props.amount) + 1);
    }
  };

  const handleChange = (event) => {
    props.setAmount(event.target.value);
  };

  const mintTextClasses = [styles.section_text, styles.yellow_text].join(" ");
  const mintSmallerTextClasses = [styles.section_text, styles.smaller].join(" ");
  const mintAutoButtonClasses = [styles.nav_link, styles.button_type, styles.auto_button].join(" ");
  const mintEqualButtonClasses = [styles.nav_link, styles.button_type, styles.equal_button].join(" ");
  const mintFreeButtonAlternativeClasses = [styles.nav_link, styles.button_type, styles.free_button, styles.alternate].join(" ");

  return (
    <section className={styles.colored} id="MINT">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      <div className={styles.uidiv}>
      <span className={styles.section_titlel}>Minting</span>
      {isNaN(supply) === false ? (
        <span className={styles.section_text}>
          Total Minted:
          <span className={styles.section_text_focus}> {supply} of 10,000</span>
        </span>
      ) : (
        <span>0</span>
      )}

      <span className={mintTextClasses}>
        
      </span>
      <div className={styles.calc_section}>
        <a className={mintAutoButtonClasses}>
          <span className={styles.plus_minus} onClick={Subtract}>
            -
          </span>{" "}
          &nbsp;&nbsp;&nbsp;
          {/* <span contenteditable="true">{props.amount}</span>&nbsp;&nbsp;&nbsp; */}
          <input value={props.amount} className={styles.inputnum} type="number" onChange={handleChange} />
          &nbsp;&nbsp;&nbsp;
          <span className={styles.plus_minus} onClick={Add}>
            +
          </span>
        
        </a>
        <br />
        <a
          className={mintEqualButtonClasses}
          onClick={() => RoundUp(5)}
        >
          5
        </a>
        <a
          className={mintEqualButtonClasses}
          onClick={() => RoundUp(10)}
        >
          10
        </a>
        <a
          className={mintEqualButtonClasses}
          onClick={() => RoundUp(20)}
        >
          20
        </a>
      </div>
    
      {supply === 1000 ? null : (
        <a 
          onClick={props.mint}
          className={mintFreeButtonAlternativeClasses}
        >
          {props.loading === true ? (
            <span>Loading.....</span>
          ) : (
            <span>Mint</span>
          )}
        </a>
      )}
      <br />
      <br />
      <span className={styles.warning}>
        Please ensure you are connected to the ETC Network in order to avoid a possible loss of funds
      </span>
      <br />
      {/* <span className="underscore">View Contract</span> */}
      <br />
      <span className={mintSmallerTextClasses}>
        Once you have minted, wait for the next ETC block confirmation and check your wallet <a href="/wallet" color="red">here!</a>
      </span>
      </div>
    </section>
  );
}

export default Mint;
