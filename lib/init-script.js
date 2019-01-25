'use babel'

import snippet from './snippet'
import InitScriptView from './init-script-view'
import {CompositeDisposable} from 'atom'

export default{
    initScriptView: null,
    modalPanel: null,
    subscriptions: null,

    initialize(state){
        this.idisposable = atom.workspace.observeActivePaneItem( editor => {
            if(!editor || !editor.getText)return;
            let ochangeTitle= editor.onDidChangeTitle(()=> {
                this.initfile(editor);
            })
            editor.onDidDestroy(()=> {
                ochangeTitle.dispose();
            })
            this.initfile(editor);
            })
        },
        activate(state){
            this.initScriptView = new InitScriptView(state.initScriptViewState);
            this.modalPanel = atom.workspace.addModalPanel({
                item: this.initScriptView.getElement(),
                visible: false
            });

            // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
            this.subscriptions = new CompositeDisposable()

            // Register command that toggles this view
            this.subscriptions.add(atom.commands.add('atom-workspace', {
                'init-file:toggle': () => this.toggle()
            }))
        },

        deactivate(){
            this.modalPanel.destroy()
            this.subscriptions.dispose()
            this.initScriptView.destroy()
            this.disposable.dispose()
        },

        serialize(){
            return{
                initScriptViewState: this.initScriptView.serialize()
            }
        },
        initfile(editorSource){
            let editor = editorSource ? editorSource : atom.workspace.getActiveTextEditor()
            if(editor){
                let fileName = editor.getTitle()
                let index=fileName.lastIndexOf(".")
                if(index === -1)return
                let suffix=fileName.substr(index+1,fileName.length-index-1)
                if(editor.getText().trim() !== '') return
                let str = snippet[suffix]
                str && (editor.insertText(str))
            }
        },
        toggle(){
            this.initfile()
        }
};
