import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as DevSkillState from '../store/DevSkill';
import { DevSkillChart } from './DevSkillChart';

type DevSkillProps = DevSkillState.DevSkillState
    & typeof DevSkillState.actionCreators
    & RouteComponentProps<{}>;

class FetchDevSkill extends React.Component<DevSkillProps, {}> {
    
    public render() {
        return <div>
            <h1>DevSkills</h1>
            <p>This components demonstrates devSkill of workers.</p>
            { this.renderDevSkillTable() }
            { this.renderButtons() }
            <DevSkillChart />
        </div>
    }

    private renderDevSkillTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>DevSkill level (1-5)</th>
                </tr>
            </thead>
            <tbody>
            {this.props.devSkills.map((devSkill, index) =>
                <tr key={ index + " " + devSkill.name }>
                    <td>{ devSkill.name }</td>
                    <td>{ devSkill.devSkillLevel }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private renderButtons() {
        return <p className='clearfix text-center'>
            <button onClick={ () => { this.props.requestDevSkills() } }>Get development skills</button>
            { this.props.isLoading ? <span>Loading...</span> : [] }
        </p>;
    }
}

export default connect(
    (state: ApplicationState) => state.devSkills,
    DevSkillState.actionCreators
)(FetchDevSkill) as typeof FetchDevSkill