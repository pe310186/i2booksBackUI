<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'Editorbar',
  data () {
    return {
      editor: null,
      info_: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear (val) {
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value (val) {
      // 使用 v-model 时，设置初始值
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)

      this.editor.customConfig.uploadImgShowBase64 = true // base 64 儲存圖片
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 將圖片大小限制為3M

      // 配置菜單
      this.editor.customConfig.menus = [
        'fontSize', // 字體大小
        'bold', // 粗體
        'fontName', // 字形
        'italic', // 斜體
        'underline', // 底線
        'strikeThrough', // 刪除線
        'foreColor', // 字顏色
        'backColor', // 背景顏色
        'link', // 超連結
        'justify', // 對齊
        'image', // 插入圖片
        'table',
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功,插入图片的回调
        }
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }

      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>

<style lang="css">
.editor {
  width: 80%;
  margin: 0 auto;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 500px;
}
</style>