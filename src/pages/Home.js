import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from "react"

import Modal from '../components/Modal';
import Search from '../components/Search'
import './Home.css'


class Home extends React.Component {

    render() {

        let home = (
            <EuiFlexGroup direction="column" justifyContent="spaceEvenly" className="flex-group">

                <EuiFlexItem grow={false} className="title">
                    <div>
                        <h1 >中医药搜索引擎</h1>
                    </div>

                </EuiFlexItem>

                <EuiFlexItem grow={false} className="flex-item-search-box">
                    <Search />
                </EuiFlexItem>

                <EuiFlexItem grow={false} className="modal">
                    <Modal />
                </EuiFlexItem>

            </EuiFlexGroup>
        )
        return (
            home
        )
    }


}

export default Home