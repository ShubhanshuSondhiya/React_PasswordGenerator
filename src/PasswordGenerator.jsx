import { useState } from "react";
import './App.css'

function PasswordGenerator() {
    const source = {
        uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase : "abcdefghijklmnopqrstuvwxyz",
        numbers : "1234567890",
        symbols : "!#$%&'()*+,-./:;<=>?@[]^_`{|}~",
    };
    const [strength,setStrength] = useState({
      uppercase : true,
      lowercase : true,
      numbers : true,
      symbols : true,
    });
    const [passwordLength,setPasswordLength]= useState(8);
    const[generatedPassword,setGeneratedPassword]=useState("");
    const[isPassCopied,setIsPassCopied]= useState(false);
    function handleCheckboxClick(e){
      const value = e.target.value;
      setStrength({...strength,[value]:!strength[value]});
    }
    function generatePassword(){
      setIsPassCopied(false);
      if(passwordLength < 8 || passwordLength > 30)
        alert("Input value between (8-30)");
      else{
        let passSource = "";
      let output = "";
      for(let x in strength){
        if(strength[x]===true){
          passSource += source[x];
        }
      }
      if(passSource.length===0) alert("Select atleast one checkbox")
      for(let i=0; i<passwordLength;i++){
        output += passSource[Math.floor(Math.random() * passSource.length)];
      }
      console.log(output);
      setGeneratedPassword(output);
      }
    }
    function copyPassword(){
      navigator.clipboard.writeText(generatedPassword);
      setIsPassCopied(true);
    }
  return (
    <div className="main_container">
    <h1>Password Generator</h1>
    <div className="container">
        <input type="checkBox" value={"uppercase"} checked = {strength.uppercase} onChange={handleCheckboxClick}/>Include UpperCase Letters
        <input type="checkBox" value={"lowercase"} checked = {strength.lowercase} onChange={handleCheckboxClick}/>Include Lowercase Letters
        <input type="checkBox" value={"numbers"} checked = {strength.numbers} onChange={handleCheckboxClick}/>Include Numbers
        <input type="checkBox" value={"symbols"} checked = {strength.symbols} onChange={handleCheckboxClick}/>Include Symbols 
    </div>
    <div className="length flex">
        <p>Password Length(8-30) :</p>
      <input type="number" min="8" max="30" placeholder="Password length (8-30)" value={passwordLength} onChange={(e)=>{
        setIsPassCopied(false);
        setPasswordLength(e.target.value);
        setGeneratedPassword("");
        }} />
    </div>
    <div className="generatedPassword">
      <input type="text" placeholder="Generated Password" readOnly value={generatedPassword}/>
    </div>
    <div className="button_div">
    <button onClick={generatePassword}>Generate Password</button>
    <button onClick={copyPassword}>{isPassCopied?"Password Copied":"Copy Password"}</button>
    </div>
    </div>
  )
}

export default PasswordGenerator