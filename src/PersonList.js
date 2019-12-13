import React from 'react';
import axios from 'axios';
import testing from './testing';

export default class PersonList extends React.Component {
  state = {
    persons: [],
    pets : [],
    petnames:[],
    empty : []
  }

  componentDidMount() {
    axios.get(`https://petclinic-turbulent-fossa.cfapps.io/owner/getAllOwners`)
      .then(res => {
        const persons = res.data;
        
        this.setState({ persons });
      })
    
      axios.get(`https://petclinic-turbulent-fossa.cfapps.io/pet/getAllPets`)
      .then(res => {
        const pets = res.data;
        
        this.setState({ pets });
      })
    
  }

  editPerson = (id) => {
    console.log('update ' + id);
    
  }

  petdetails = (id) => {
    var temp =[]
    this.state.pets.map(
      pet => 
        (pet.ownerId === id) ? temp.push(pet.name + ' ') : null
      
      );

      console.log("list details --" + this.state.petnames);
      return temp;
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>Address</th>
            <th>City</th>
            <th>Telephone</th>
            <th>Pets</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.persons.map(
              o => <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.address}</td>
                    <td>{o.city}</td>
                    <td>{o.phoneNumber}</td>
                    {/* {
                      this.state.pets.map(
                      pet => 
                        (pet.ownerId === o.id) ? this.state.petnames.push(pet.name) : null
                      
                      )
                    } */}
                    {/* {console.log("list details --" + this.state.petnames)} */}
                    <td>{this.petdetails(o.id)}</td>
                    {/* {
                      this.state.petnames = []
                    } */}
                    <td><button onClick={() => this.editPerson(o.id)}>edit</button></td>
                    <td><button>delete</button></td>
                  </tr>
            )
          }
        </tbody>

      </table>
    )
  }
}