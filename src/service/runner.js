import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const tempDir = "./temp"; 
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

export async function runCode({ language, code, input = "", expectedOutput = "" }) {
    const fileName = Date.now();
    let sourceFile, runCmd, compileCmd, args = [];

    switch (language) {
        case "cpp":
            sourceFile = path.join(tempDir, `${fileName}.cpp`);
            fs.writeFileSync(sourceFile, code);
            compileCmd = ["g++", [sourceFile, "-o", `${tempDir}/${fileName}.out`]];
            runCmd = `${tempDir}/${fileName}.out`;
            break;

        case "python":
            sourceFile = path.join(tempDir, `${fileName}.py`);
            fs.writeFileSync(sourceFile, code);
            runCmd = "python3";
            args = [sourceFile];
            break;

        case "java":
            sourceFile = path.join(tempDir, `${fileName}.java`);
            fs.writeFileSync(sourceFile, code);
            compileCmd = ["javac", [sourceFile]];
            runCmd = "java";
            args = ["-cp", tempDir, fileName];
            break;

        case "javascript":
            sourceFile = path.join(tempDir, `${fileName}.js`);
            fs.writeFileSync(sourceFile, code);
            runCmd = "node";
            args = [sourceFile];
            break;

        default:
            throw new Error("Unsupported language");
    }

    // Helper function to run a command and return stdout/stderr
    const runProcess = (command, argsList = [], inputData = "") => {
        return new Promise((resolve) => {
            const proc = spawn(command, argsList);
            let stdout = "";
            let stderr = "";

            if (inputData) proc.stdin.write(inputData);
            proc.stdin.end();

            proc.stdout.on("data", (data) => stdout += data.toString());
            proc.stderr.on("data", (data) => stderr += data.toString());

            // Kill after 5 seconds to prevent infinite loops
            const timeout = setTimeout(() => {
                proc.kill();
                resolve({ status: "error", error: "Time limit exceeded" });
            }, 5000);

            proc.on("close", (code) => {
                clearTimeout(timeout);
                if (code !== 0) {
                    resolve({ status: "error", error: stderr || "Unknown runtime error" });
                } else {
                    resolve({ status: "success", output: stdout.trim() });
                }
            });
        });
    };

    try {
        // Compile if necessary
        if (compileCmd) {
            const compileResult = await runProcess(compileCmd[0], compileCmd[1]);
            if (compileResult.status === "error") return { status: "compile_error", error: compileResult.error };
        }

        // Run the program
        const runResult = await runProcess(runCmd, args, input);

        if (runResult.status === "error") {
            return { status: "runtime_error", error: runResult.error };
        }

        // Check output
        const cleanedOutput = runResult.output.trim();
        if (expectedOutput && cleanedOutput !== expectedOutput.trim()) {
            return { status: "fail", output: cleanedOutput, expected: expectedOutput.trim() };
        }

        return { status: "pass", output: cleanedOutput };

    } catch (err) {
        return { status: "error", error: err.message };
    }
}
