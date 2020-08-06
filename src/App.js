import React ,{Component}from 'react';
import {connect} from 'react-redux';
import CardList from './CardList';
import 'tachyons';
import SearchBox from './searchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';
import {setSearchField, requestRobots} from './actions';

const mapStateToProps = state => {
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error: state.requestRobots.error
        
    }
}

const mapDispatchToProps = (dispatch) =>{
   return  {
       onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
       onRequestRobots: () => dispatch(requestRobots())
    }
}
class App extends Component{
    

    componentDidMount(){
        this.props.onRequestRobots();
    }

   
    render() {
        
        const {searchField , onSearchChange,robots,isPending} = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());  
        })
        const val = (searchField === ''?'dummy': searchField);
        return isPending?
                <h1>LOADING</h1> :
        (
            
            <div className = 'tc'>
                <h1>RoboFriends</h1>
                <h1>{val}</h1>
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps) (App);