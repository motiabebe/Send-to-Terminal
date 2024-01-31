"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    /**
     *
     * This function is used to send selected text to active terminal
     *
     */
    const disposable = vscode.commands.registerCommand('extension.passToTerminal', () => {
        try {
            const editor = vscode.window.activeTextEditor;
            const terminal = vscode.window.activeTerminal;
            if (editor && terminal) {
                const selection = editor.selection;
                const text = editor.document.getText(selection);
                if (text.trim() !== '') {
                    terminal.sendText(text, false);
                    terminal.show();
                }
                else {
                    vscode.window.showErrorMessage('No text selected');
                }
            }
            else {
                vscode.window.showErrorMessage('No active editor or terminal');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(String(error));
        }
    });
    /**
     *
     * This function is used to send selected text to active terminal and execute it
     *
     */
    const executeDisposable = vscode.commands.registerCommand('extension.executeInTerminal', () => {
        try {
            const editor = vscode.window.activeTextEditor;
            const terminal = vscode.window.activeTerminal;
            if (editor && terminal) {
                const selection = editor.selection;
                const text = editor.document.getText(selection);
                if (text.trim() !== '') {
                    terminal.sendText(text, true);
                }
                else {
                    vscode.window.showErrorMessage('No text selected');
                }
            }
            else {
                vscode.window.showErrorMessage('No active editor or terminal');
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(String(error));
        }
    });
    // push to subscriptions
    context.subscriptions.push(disposable);
    context.subscriptions.push(executeDisposable);
}
exports.activate = activate;
//# sourceMappingURL=sendToTerminal.js.map