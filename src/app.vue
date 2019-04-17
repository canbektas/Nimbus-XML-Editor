<template>
  <div id="app">
    <div class="mark">
      <img src="./nimbus-logo.png" class="app-logo">
      Nimbus XML Editor <small>0.1.0</small>
    </div>

    <div class="code-pane">XML Code</div>
    <div class="code-wrapper" :class="{'change': changing}">
      <code-editor v-model="xmlData" :theme="editorTheme" lang="xml" class="code-editor" />
    </div>

    <div class="wrapper">
      <button class="btn convert-btn" @click="convertXMLtoJS" >Convert</button>
      <button class="btn reset-btn" @click="resetData">Reset</button>
    </div>
    <div v-if="errMsg.length" class="error-message">{{ errMsg }}</div>
    <div v-if="jsData && Object.keys(jsData).length" class="stage">
      <div v-for="(node, index) in jsData.elements" :key="index">
        <div class="code-pane" style="margin:20px 0;">View</div>
        <recursive-node :data="node" :level="0" :index="0" @addNode="e => { addNode(e) }" @removeNode="e => { removeNode(e) }"/>
      </div>
    </div>

    <button v-if="jsData && Object.keys(jsData).length" class="btn convert-btn mt20" @click="convertJStoXML" >Convert to XML</button>

  </div>
</template>

<script>
  import CodeEditor from './components/code-editor'
  import xmljs from 'xml-js'
  import RecursiveNode from './components/recursive-node.vue'
  // import { unset } from 'lodash-es'

  export default {
    name: 'App',
    components: {
      CodeEditor,
      RecursiveNode
    },
    data () {
      return {
        editorDarkMode: false,
        editorTheme: 'github',
        xmlData: '',
        jsData: {},
        errMsg: '',
        changing: false
      }
    },
    methods: {
      convertXMLtoJS () {
        try {
          this.jsData = xmljs.xml2js(this.xmlData);
          this.errMsg = '';
        }
        catch(e) {
          this.errMsg = 'Invalid XML provided. Please fix errors on XML.';
        }
        console.log(this.jsData)
      },
      convertJStoXML () {
        try {
          this.xmlData = xmljs.js2xml(this.jsData, {spaces: 2});
        }
        catch (e){
          this.errMsg = 'View has errors. Please fix inputs below and try converting again.';
        }
        window.scrollTo(0, 0);
        this.changing = true;
        setTimeout(() => {
          this.changing = false;
        }, 1000);
      },
      resetData () {
        this.xmlData = '';
        this.jsData = {};
      },
      removeNode (e) {
        /*
        const selectedIndex = e.split('-');
        let selection = '';
        selectedIndex.forEach(index => {
          selection = selection.endsWith(']') ? selection + '.' : selection;
          selection = selection + 'elements[' + index + ']';
        })
        console.log(selection);
        unset(this.jsData, selection);
        */
      },
      addNode (e) {
        /*
        console.warn(e);
        */
      },
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-weight: bold;
    margin: 15px;
  }

  .app-logo {
    width: 24px;
    margin-right: 10px;
    margin-bottom: -5px;
  }

  .mark {
    margin-bottom: 12px;
  }

  .stage {
    text-align: left;
    background-color: #e8e8e8;
    padding: 0 15px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .code-pane {
    background: #e8e8e8;
    text-align: left;
    padding: 10px;
    font-size: 12px;
    border-radius: 4px 4px 0 0;
  }

  .code-wrapper {
    border: 1px solid #fff;
    -webkit-transition: all ease 700ms;
    -moz-transition: all ease 700ms;
    -ms-transition: all ease 700ms;
    -o-transition: all ease 700ms;
    transition: all ease 700ms;
  }

  .change {
    border: 1px solid rgba(255, 17, 27, 0.66);
  }

  .btn{
    font-weight: bold;
    font-size: 13px;
    border: 0;
    border-radius: 4px;
    padding: 10px 20px;
    margin: 0 12px;
    cursor: pointer;
    opacity: 1;
    transition: opacity ease 500ms;
  }
  .btn:hover {
    opacity: 0.85;
  }

  .convert-btn {
    background: #069eff;
    color: #fff;
  }

  .reset-btn {
    background-color: #8e8e8e;
    color: #fff;
    float: right;

  }

  .mt20 {
    margin-top: 20px;
  }

  .error-message {
    display: block;
    background: #b71d00;
    color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
  }

</style>
