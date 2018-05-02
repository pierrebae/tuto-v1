import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import {addNameToList} from '../actions/action';
import {ajouterPersons} from '../actions/action';
import {  compose } from "redux";
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    button: {
        marginTop: theme.spacing.unit * 2,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class Formulaire extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genre: 'Mr',
            isSubmit: false,
            name:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = key => event =>  {

        this.setState({
                [key]: event.target.value,
            });
    };

    handleSubmit(event) {
        event.preventDefault();
        let person={ id: this.props.persons.length ,name: this.state.name, genre: this.state.genre }
        this.props.ajouterPersons(person);
            this.props.addNameToList(this.state.name);
        this.props.addHommes(this.state.genre);

    }

    render() {
        const { classes } = this.props;
        let {genre,isSubmit}=this.state;

        return (
            <div className={classes.root}>
                <form onSubmit={this.handleSubmit}  >
                    <FormControl component="fieldset" required className={classes.formControl}>
                            <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.genre}
                            onChange={this.handleChange('genre')}
                        >
                            <FormControlLabel value="Ms" control={<Radio />} label="Femme" />
                            <FormControlLabel value="Mr" control={<Radio />} label="Homme" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        defaultValue=""
                        label={genre}
                        id="bootstrap-input"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                        <div>
                        <Button type="submit" variant="raised" color="secondary" >
                            Add Name to List
                        </Button>
                        </div>
                </form>
            </div>
        );
    }
}

Formulaire.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps=(state)=>{
    return {
        names: state.names,
        persons: state.persons,
    };
};
const mapDispatchToProps=(dispatch)=>({
        addNameToList: name => {
            dispatch(addNameToList(name));
        },
        ajouterPersons: person => {
            dispatch(ajouterPersons(person));
        }
    }
);



export default compose(withStyles(styles),connect(mapStateToProps,mapDispatchToProps))(Formulaire);