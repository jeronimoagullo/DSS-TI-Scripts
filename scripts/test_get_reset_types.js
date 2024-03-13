/**
 * @file test_get_reset_types.js
 * @author Jeronimo Agullo (jeronimoagullo97@gmail.com)
 * @brief Example of how to get reset types of target with DSS script
 * @version 1.0
 * @date 2024-03-13
 * 
 * @copyright Copyright (c) 2024
 * 
 */
importPackage(Packages.com.ti.debug.engine.scripting);
importPackage(Packages.com.ti.ccstudio.scripting.environment);
importPackage(Packages.java.lang);

/**
 * @brief This function prints in both generated xml and scripting console
 * @param {T} msg 
 */
function print_debug(msg){
    script.traceWrite(msg);
    print(msg)
}

/* INITIALIZATION */
var script = ScriptingEnvironment.instance();

// Create a log file in the current directory to log script execution
script.traceBegin("test.xml", "DefaultStylesheet.xsl")

// Set script timeout in milliseconds
script.setScriptTimeout(60000)

// Log everthing
script.traceSetConsoleLevel(TraceLevel.INFO)
script.traceSetFileLevel(TraceLevel.ALL)

// Get debug server and configure target for a MSP430F5438A used by EW
print_debug("Configuring debug server for MSP430F5438A EW...")
debugServer = script.getServer("DebugServer.1")
debugServer.setConfig("MSP430F5438A.ccxml");
print_debug("MSP430F5438A EW configured")

// Start a debug session and connect the target
debugSession = debugServer.openSession(".*")
debugSession.target.connect();

var numResets = debugSession.target.getNumResetTypes();
print_debug("Number of resets: " + numResets)

for (count = 0; count < numResets; count++)
{
	var reset0 = debugSession.target.getResetType(count);
	print_debug("Reset name: " + reset0.getName() + ". " + reset0.getDescription())
	if ( reset0.isAllowed() ) { reset0.issueReset(); }
}


print_debug("end debug dss script")

/* END */
script.traceEnd()
debugSession.terminate()
debugServer.stop()