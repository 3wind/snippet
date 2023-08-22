const fs = require('fs');

var obj = [
  {
    key: 'scan-dirs',
    component: 'el-input',
    span: 22,
    label: 'i18n.channelFrom.scanDirs',
    labelWidth: '160px',
    props: {
      placeholder: 'i18n.channelFrom.scanDirs',
      clearable: true,
      style: { width: '92%', display: 'inline-block' }
    },
    itemProps: {
      rules: [{
        required: false,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          if (this.valueIsEmpty(value)) {
            callback()
          } else if (value.length > 500) {
            callback(new Error(this.$t('channelFrom.maxLenLimit')))
          } else if (!this.isWinDirs(value)) {
            callback(new Error(this.$t('channelFrom.winDirsLimit')))
          } else {
            callback()
          }
        }
      }]
    },
    after: 'popover',
    popoverContext: 'i18n.channelFrom.scanDirsDes'
  },
  {
    key: 'exclude-dirs',
    component: 'el-input',
    span: 22,
    label: 'i18n.channelFrom.excludeDirs',
    labelWidth: '160px',
    props: {
      placeholder: 'i18n.channelFrom.excludeDirs',
      clearable: true,
      style: { width: '92%', display: 'inline-block' }
    },
    itemProps: {
      rules: [{
        required: false,
        trigger: 'blur',
        validator: (rule, value, callback) => {
          if (this.valueIsEmpty(value)) {
            callback()
          } else if (value.length > 500) {
            callback(new Error(this.$t('channelFrom.maxLenLimit')))
          } else if (!this.isWinDirs(value)) {
            callback(new Error(this.$t('channelFrom.winDirsLimit')))
          } else {
            callback()
          }
        }
      }]
    },
    after: 'popover',
    popoverContext: 'i18n.channelFrom.excludeDirsDes'
  },
  {
    key: 'idle-duration',
    component: 'el-input-number',
    span: 22,
    label: 'i18n.channelFrom.idleDuration',
    labelWidth: '160px',
    props: {
      min: 0,
      max: 300,
      clearable: true,
      'controls-position': 'right',
      placeholder: 'i18n.channelFrom.idleDuration',
      style: { width: '92%', display: 'inline-block' }
    },
    after: 'popover',
    popoverContext: 'i18n.channelFrom.idleDurationDes'
  }
]

var jsonText = JSON.stringify(obj,
  (k, v) => {
    if (typeof v === 'function') {
      return `IS_FUNCTION ${v}`
    } else {
      return v
    }
  }
)
console.log(jsonText)
fs.writeFile('./test.txt', jsonText, err => {
  if (err) {
    console.error(err);
  }
});

const parse = (jsonStr) => {
  return JSON.parse(jsonStr, (key, value) => {
    if (value && typeof value === 'string') {
      return value.indexOf('IS_FUNCTION') > -1 ? new Function(`return ${value.replace('IS_FUNCTION', '')}`).call(this) : value
    }
    return value
  })
}

