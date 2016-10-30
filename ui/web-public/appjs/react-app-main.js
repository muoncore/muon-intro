var UserInfo = React.createClass({
    render: function () {

        var user = this.props.user

        return (
            <div class="my-component">
                <h1>Your Name is, {user.name}</h1>
                <h1>Your email is, {user.email}</h1>
                <h1>Your site is, {user.site}</h1>
            </div>
        )
    }
});

var ScanList = React.createClass({
    render: function () {

        var scans = this.props.scanList
        var site = scans.site || ''
        var scanList = scans.scans || []
        return (
            <div className="my-component">
                <h3>{site}</h3>
                <ul>
                {
                    scanList.map(function(scan) {
                        return (<li key={scan.date}>
                            <h4>{scan.date}</h4>
                            <ul>
                                {
                                    scan.anomalies.map(function(an) {
                                        return (<li>{an.name}</li>)
                                    })
                                }
                            </ul>

                        </li>)
                    })
                }
                </ul>
            </div>
        )
    }
});

var Shop = React.createClass({
    setGreeting: function () {
        this.setState({
            name: this.state.new_name
        });
    },
    componentDidMount: function () {
        this.app = shop()
        var _this = this;
        _this.app.getUser(function (user) {
            _this.setState({
                user: user
            })
        })
        _this.app.getScanList(function (scanList) {
            _this.setState({
                scanList: scanList
            })
        })
    },
    getInitialState: function () {
        return {
            name: 'enter your name',
            scanList: [],
            user: {}
        }
    },
    setName: function (event) {
        this.setState({
            new_name: event.target.value.toLowerCase(),
            name: this.state.name
        });
        /*this.setState({
         name: event.target.value.toLowerCase()
         });*/
    },
    render: function () {
        return (
            <div class="my-component">
                <UserInfo user={this.state.user}/>
                <ScanList scanList={this.state.scanList}/>

                <h1>Hello, {this.state.name}</h1>
                <input type="text" placeholder="Name" onChange={this.setName}/>

                <button type="button" onClick={this.setGreeting}>submit</button>
            </div>
        )
    }
});

ReactDOM.render(
    <Shop />,
    document.getElementById('page-body')
);
