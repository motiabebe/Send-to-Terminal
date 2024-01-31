import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

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
                    
                } else {
                    vscode.window.showErrorMessage('No text selected');
                }
            } else {
                vscode.window.showErrorMessage('No active editor or terminal');
            }
        } catch (error) {
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
                } else {
                    vscode.window.showErrorMessage('No text selected');
                }
            } else {
                vscode.window.showErrorMessage('No active editor or terminal');
            }
        } catch (error) {
            vscode.window.showErrorMessage(String(error));
        }
    });

    // push to subscriptions
    context.subscriptions.push(disposable);
    context.subscriptions.push(executeDisposable);
}