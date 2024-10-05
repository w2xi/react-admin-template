import { Alert } from 'antd'
import ReactJson from '@microlink/react-json-view'
import pkg from '@microlink/react-json-view/package.json'
import { css } from '@emotion/react'

const jsonData = { ...pkg }

function JSONEditorPage() {
  return (
    <div css={styles}>
      <Alert
        type="info"
        message={
          <span>
            based on{' '}
            <a href="https://github.com/microlinkhq/react-json-view" target="_blank">
              react-json-view
            </a>
          </span>
        }
      />
      <ReactJson theme="monokai" src={jsonData} />
    </div>
  )
}

export default JSONEditorPage

const styles = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-alert {
    margin-bottom: 20px;
  }
  .react-json-view {
    flex: 1;
    overflow: auto;
  }
`
