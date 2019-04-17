<script>
  import ace from 'brace'

  export default {
    name: 'CodeEditor',
    props: {
      value: {
        type: String,
        required: true,
        default: ''
      },
      lang: {
        type: String,
        default: 'text'
      },
      theme: {
        type: String,
        default: 'clouds'
      },
      height: {
        type: [String, Number],
        default: 'auto'
      },
      width: {
        type: [String, Number],
        default: 'auto'
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        editor: null,
        contentBackup: ''
      }
    },
    watch: {
      value: function (val) {
        if (this.contentBackup !== val) {
          this.editor.setValue(val, 1)
          this.contentBackup = val
        }
      },
      theme: function (newTheme) {
        require('brace/theme/' + newTheme)
        this.editor.setTheme('ace/theme/' + newTheme)
      },
      lang: function (newLang) {
        require('brace/mode/' + newLang)
        require('brace/snippets/' + newLang)
        this.editor.getSession().setMode('ace/mode/' + newLang)
      },
      options: function (newOption) {
        this.editor.setOptions(newOption)
      },
      height: function () {
        this.$nextTick(function () {
          this.editor.resize()
        })
      },
      width: function () {
        this.$nextTick(function () {
          this.editor.resize()
        })
      }
    },
    mounted: function () {
      require('brace/ext/emmet')
      const editor = this.editor = ace.edit(this.$el)

      require('brace/ext/language_tools')
      require('brace/mode/less')
      require('brace/ext/searchbox')
      require('brace/mode/' + this.lang)
      require('brace/theme/' + this.theme)
      require('brace/snippets/' + this.lang)


      editor.$blockScrolling = Infinity
      editor.setOption('enableEmmet', true)
      editor.getSession().setMode('ace/mode/' + this.lang)
      editor.setTheme('ace/theme/' + this.theme)
      editor.setValue(this.value, 1)
      this.contentBackup = this.value

      editor.on('change', () => {
        const content = editor.getValue()
        /* Annotations */
        // this.$emit('annotations', editor.getSession().getAnnotations())
        /* */
        this.$emit('input', content)
        this.contentBackup = content
      })

      if (this.options) editor.setOptions({readOnly: this.disabled, printMargin: 0, ...this.options})

    },
    beforeDestroy: function () {
      this.editor.destroy()
      this.editor.container.remove()
    },
    methods: {
      px: function (n) {
        if (/^\d*$/.test(n)) return n + 'px'
        return n
      }
    },
    render: function (h) {
      const height = this.px(this.height)
      const width = this.px(this.width)
      return h('div', {
        attrs: {
          style: 'height: ' + height + '; width: ' + width,
        }
      })
    },
  }
</script>

<style lang="scss">

  .code-editor {
    width: auto;
    height: auto;
    min-height: 275px;
    border-radius: 0 0 4px 4px;
    margin-bottom: 10px;
    word-spacing: 0;
    border: 1px solid #ebebeb;

  &.ace_dark .ace_marker-layer .ace_selection {
     background: #858585 !important;
   }
  }
</style>
