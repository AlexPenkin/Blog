console.log('aa');
class Auth extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.sendOnServer = this.sendOnServer.bind(this);
        this.state = {
        css: {
          authBlock: {
            transition: 'all 0.3s',
            opacity: '0',
            transform: 'translateX(-150px)',
          },
          authWrap: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'rgb(0, 0, 0, 0.3)',
          }
          },
        value: {
          username: '',
          password: '',
          email: '',
        }};
        this.setState = this.setState.bind(this);
        console.log(this.state);
    };

    componentDidMount() {
      document.body.style.overflow='hidden';
      setTimeout(() => {
        this.setState({css: {authBlock: {
          transition: 'all 0.3s',
          opacity: '1',
          transform: 'translateX(0px)',
          marginTop: '20vh',
          background: 'white',
          borderRadius: '55px',
          padding: '90px',

        },
        authWrap: {
          position: 'absolute',
          width: '100%',
          transition: 'all 0.3s',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.65)',

        }
        }
      }
        );
      }, 1);

      console.log('done');
    }
    sendOnServer(props) {
      console.log(this.state);
    }

    handleChange(event) {
      let name = event.target.name;
      let val = event.target.value;
      this.setState(() => {
        let st = this.state;
        st.value[name] = val;
        return st;
      })
    }

    render() {
    return(
      <div className="authWrap" style={this.state.css.authWrap}>
         <div className="signBlock logQuad col-lg-4 col-md-2 col-sm-12 col-xs-12 col-md-offset-5 col-lg-offset-4" style={this.state.css.authBlock} >
            < p > Регистрация {this.state.value.username} < /p>
            <input type=" input " placeholder=" Логин " name="username" className="form-control" onChange={this.handleChange} value={this.state.value.username} />
            <input type=" password " placeholder=" Пароль " name="password" className=" form-control  " onChange={this.handleChange} value={this.state.value.password} />
            <input type=" email " placeholder=" email " name="email" className=" form-control " onChange={this.handleChange} value={this.state.value.email} />
            <button className="awesomeBut" onClick = {this.sendOnServer}>
                Зарегистрироваться
            </button>

          </div>
        </div>
      );
};
};
ReactDOM.render(<Auth
  />, document.getElementById('Auth'));
