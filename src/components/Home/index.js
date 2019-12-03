// import React from 'react';
// import { compose } from 'recompose';
//
// import { withAuthorization } from '../Session';
//
// const HomePage = () => (
//   <div className="container margin">
//     <div id="wrapper">
//       <div id="content-wrapper">
//         <div className="container-fluid">
//           <div className="card mb-3">
//             <div className="card-header">
//               <i className="fas fa-chart-area"/>
//               User Table
//             </div>
//             <div className="card-body">
//               <canvas id="myAreaChart" width="100%" height={30}/>
//               div
//             </div>
//             <div className="card-footer small text-muted">
//               Updated yesterday at 11:59 PM
//             </div>
//           </div>
//           {/* DataTables Example */}
//           <div className="card mb-3">
//             <div className="card-header">
//               <i className="fas fa-table"/>
//               Data Table Example
//             </div>
//             <div className="card-body mb-3">
//               <div className="table-responsive">
//                 <table
//                   className="table table-bordered"
//                   id="dataTable"
//                   width="100%"
//                   cellSpacing={0}
//                 >
//                   <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Office</th>
//                     <th>Age</th>
//                     <th>Start date</th>
//                     <th>Salary</th>
//                   </tr>
//                   </thead>
//                   <tfoot>
//                   <tr>
//                     <th>Name</th>
//                     <th>Position</th>
//                     <th>Office</th>
//                     <th>Age</th>
//                     <th>Start date</th>
//                     <th>Salary</th>
//                   </tr>
//                   </tfoot>
//                   <tbody>
//                   <tr>
//                     <td>Tiger Nixon</td>
//                     <td>System Architect</td>
//                     <td>Edinburgh</td>
//                     <td>61</td>
//                     <td>2011/04/25</td>
//                     <td>$320,800</td>
//                   </tr>
//                   <tr>
//                     <td>nany</td>
//                     <td>System Architect</td>
//                     <td>Edinburgh</td>
//                     <td>61</td>
//                     <td>2011/04/25</td>
//                     <td>$320,800</td>
//                   </tr>
//                   <tr>
//                     <td>Garrett Winters</td>
//                     <td>Accountant</td>
//                     <td>Tokyo</td>
//                     <td>63</td>
//                     <td>2011/07/25</td>
//                     <td>$170,750</td>
//                   </tr>
//                   <tr>
//                     <td>Ashton Cox</td>
//                     <td>Junior Technical Author</td>
//                     <td>San Francisco</td>
//                     <td>66</td>
//                     <td>2009/01/12</td>
//                     <td>$86,000</td>
//                   </tr>
//                   <tr>
//                     <td>Cedric Kelly</td>
//                     <td>Senior Javascript Developer</td>
//                     <td>Edinburgh</td>
//                     <td>22</td>
//                     <td>2012/03/29</td>
//                     <td>$433,060</td>
//                   </tr>
//                   <tr>
//                     <td>Airi Satou</td>
//                     <td>Accountant</td>
//                     <td>Tokyo</td>
//                     <td>33</td>
//                     <td>2008/11/28</td>
//                     <td>$162,700</td>
//                   </tr>
//                   <tr>
//                     <td>Brielle Williamson</td>
//                     <td>Integration Specialist</td>
//                     <td>New York</td>
//                     <td>61</td>
//                     <td>2012/12/02</td>
//                     <td>$372,000</td>
//                   </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <div className="card-footer small text-muted">
//               Updated yesterday at 11:59 PM
//             </div>
//           </div>
//         </div>
//         <footer className="sticky-footer">
//           <div className="container my-auto">
//             <div className="copyright text-center my-auto">
//               <span>Copyright © Your Website 2019</span>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   </div>
// );
//
// // const condition = authUser => !!authUser;
// //
// // console.log(condition);
// //
// export default compose(
//   withAuthorization(authUser => !!authUser),
// )(HomePage);
// // export default HomePage;
import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('products');
    this.user = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      products: [],
      users: [],
    };
  }

  onCollection = (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      const { name, title, price, url, roles } = doc.data();
      products.push({
        key: doc.id,
        doc,
        name,
        title,
        price,
        url,
        roles,
      });
    });
    this.setState({
      products,
    });
  };

  onColletUser = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { email, username } = doc.data();
      users.push({
        key: doc.id,
        email,
        username,
      });
    });
    this.setState({
      users
    })
  };


  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollection);
    this.unsubscribe = this.user.onSnapshot(this.onColletUser);
  }

  render() {
    return (
      <div>
        <div className="container margin">
          <div id="wrapper">
            <div id="content-wrapper">
              <div className="container-fluid">
                <div className="card mb-3">
                  <div className="card-header">
                    <i className="fas fa-chart-area"/>
                    User Table
                  </div>
                  <div className="card-body mb-3">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead>
                        <tr>
                          <th>Email</th>
                          <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user => (
                          <tr  key={user.uid}>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                      <hr/>
                      <a className="btn btn-primary" href="/user" style={{ float: 'right' }}>Show more</a>
                    </div>
                  </div>
                </div>
                {/* DataTables Example */}
                <div className="card mb-3">
                  <div className="card-header">
                    <i className="fas fa-table"/>
                    Pizza Table
                  </div>
                  <div className="card-body mb-3">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead>
                        <tr>
                          <th>Category</th>
                          <th>Name</th>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.products.map(board =>
                          <tr>
                            <td>{board.roles}</td>
                            <td>{board.name}</td>
                            <td>{board.title}</td>
                            <td><img width="100px" style={{ borderRadius: '50%' }} src={board.url} alt=""/></td>
                            <td>{board.price}</td>
                          </tr>,
                        )}
                        </tbody>
                      </table>
                      <hr/>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="sticky-footer">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright © Your Website 2019</span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
