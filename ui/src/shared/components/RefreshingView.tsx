// Libraries
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

// Components
import TimeSeries from 'src/shared/components/TimeSeries'
import EmptyQueryView from 'src/shared/components/EmptyQueryView'
import ViewSwitcher from 'src/shared/components/ViewSwitcher'

// Utils
import {GlobalAutoRefresher} from 'src/utils/AutoRefresher'
import {getTimeRangeVars} from 'src/variables/utils/getTimeRangeVars'
import {getVariableAssignments} from 'src/variables/selectors'
import {getDashboardValuesStatus} from 'src/variables/selectors'
import {checkResultsLength} from 'src/shared/utils/vis'

// Types
import {TimeRange, RemoteDataState} from 'src/types'
import {VariableAssignment} from 'src/types/ast'
import {AppState} from 'src/types'
import {DashboardQuery} from 'src/types/dashboards'
import {QueryViewProperties, ViewType} from 'src/types/dashboards'

interface OwnProps {
  timeRange: TimeRange
  manualRefresh: number
  properties: QueryViewProperties
  dashboardID: string
}

interface StateProps {
  variableAssignments: VariableAssignment[]
  variablesStatus: RemoteDataState
}

interface State {
  submitToken: number
}

type Props = OwnProps & StateProps

class RefreshingView extends PureComponent<Props, State> {
  public static defaultProps = {
    inView: true,
    manualRefresh: 0,
  }

  constructor(props) {
    super(props)

    this.state = {submitToken: 0}
  }

  public componentDidMount() {
    GlobalAutoRefresher.subscribe(this.incrementSubmitToken)
  }

  public componentWillUnmount() {
    GlobalAutoRefresher.unsubscribe(this.incrementSubmitToken)
  }

  public render() {
    const {properties, manualRefresh} = this.props
    const {submitToken} = this.state

    return (
      <TimeSeries
        submitToken={submitToken}
        queries={this.queries}
        key={manualRefresh}
        variables={this.variableAssignments}
      >
        {({giraffeResult, files, loading, errorMessage, isInitialFetch}) => {
          return (
            <EmptyQueryView
              errorMessage={errorMessage}
              hasResults={checkResultsLength(giraffeResult)}
              loading={loading}
              isInitialFetch={isInitialFetch}
              queries={this.queries}
              fallbackNote={this.fallbackNote}
            >
              <ViewSwitcher
                giraffeResult={giraffeResult}
                files={files}
                loading={loading}
                properties={properties}
              />
            </EmptyQueryView>
          )
        }}
      </TimeSeries>
    )
  }

  private get queries(): DashboardQuery[] {
    const {properties} = this.props
    const {type, queries} = properties

    if (type === ViewType.SingleStat) {
      return [queries[0]]
    }

    if (type === ViewType.Gauge) {
      return [queries[0]]
    }

    return queries
  }

  private get variableAssignments(): VariableAssignment[] {
    const {timeRange, variableAssignments} = this.props

    return [...variableAssignments, ...getTimeRangeVars(timeRange)]
  }

  private get fallbackNote(): string {
    const {note, showNoteWhenEmpty} = this.props.properties

    return showNoteWhenEmpty ? note : null
  }

  private incrementSubmitToken = () => {
    this.setState({submitToken: Date.now()})
  }
}

const mstp = (state: AppState, ownProps: OwnProps): StateProps => {
  const variableAssignments = getVariableAssignments(
    state,
    ownProps.dashboardID
  )

  const valuesStatus = getDashboardValuesStatus(state, ownProps.dashboardID)

  return {variableAssignments, variablesStatus: valuesStatus}
}

export default connect<StateProps, {}, OwnProps>(mstp)(RefreshingView)
