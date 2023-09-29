consoleLogging = false;

consoleLog = (...parms) => {
  if (consoleLogging)
     console.log(parms.join(' '));
} 

consoleLogLine = (length) => {
  consoleLogLineChar(length, "=");
} 

consoleLogLineChar = (length, lineChar) => {
  line = "";
  for(var i=0; i < length; i++){
    line += lineChar;
  }
  consoleLog(line);
} 

setConsoleDebugLoggingOn = () => {
  consoleLogging = true;
}

setConsoleDebugLoggingOff = () => {
  consoleLogging = false;
}

logHeader = (headerStr) => {
  consoleLogLine(100);
  consoleLog(headerStr);
}

class spCoinLogger {
    constructor(parentName) {
      this.parentName = parentName;
    }

    setConsoleDebugLoggingOn() {
        consoleLogging = true;
    }
    
    setConsoleLoggingOff() {
        consoleLogging = false;
    }

    logHeader(headerStr) {
        consoleLogLine(100);
        consoleLog(headerStr);
    }
}

module.exports = {
    spCoinLogger
};
