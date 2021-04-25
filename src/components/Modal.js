import '@elastic/eui/dist/eui_theme_amsterdam_light.css';

import { EuiSpacer } from '@elastic/eui';
import React, { useState } from 'react';

import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiCodeBlock,
} from '@elastic/eui';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal className="modal" onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>关于我们</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
        北京中医药大学管理学院学生，想做些对世界有意的事情
          <EuiSpacer />
          
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={closeModal} fill>
            关闭
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <div>
      <EuiButton onClick={showModal}>关于我们</EuiButton>
      {modal}
    </div>
  );
};

export default App;