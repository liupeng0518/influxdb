// Libraries
import React, {PureComponent} from 'react'
import _ from 'lodash'
import memoizeOne from 'memoize-one'

// Components
import {ResourceList} from 'src/clockface'
import EmptyTemplatesList from 'src/templates/components/EmptyTemplatesList'
import TemplateCard from 'src/templates/components/TemplateCard'

// Types
import {TemplateSummary} from '@influxdata/influx'
import {SortTypes} from 'src/shared/utils/sort'
import {Sort} from 'src/clockface'

// Selectors
import {getSortedResources} from 'src/shared/utils/sort'

type SortKey = 'meta.name'

interface Props {
  templates: TemplateSummary[]
  searchTerm: string
  onFilterChange: (searchTerm: string) => void
  onImport: () => void
  sortKey: string
  sortDirection: Sort
  sortType: SortTypes
  onClickColumn: (nextSort: Sort, sortKey: SortKey) => void
}

export default class TemplatesList extends PureComponent<Props> {
  private memGetSortedResources = memoizeOne<typeof getSortedResources>(
    getSortedResources
  )

  public render() {
    const {
      searchTerm,
      onImport,
      sortKey,
      sortDirection,
      onClickColumn,
    } = this.props

    const headerKeys: SortKey[] = ['meta.name']

    return (
      <>
        <ResourceList>
          <ResourceList.Header>
            <ResourceList.Sorter
              name="Name"
              sortKey={headerKeys[0]}
              sort={sortKey === headerKeys[0] ? sortDirection : Sort.None}
              onClick={onClickColumn}
            />
          </ResourceList.Header>
          <ResourceList.Body
            emptyState={
              <EmptyTemplatesList searchTerm={searchTerm} onImport={onImport} />
            }
          >
            {this.rows}
          </ResourceList.Body>
        </ResourceList>
      </>
    )
  }

  private get rows(): JSX.Element[] {
    const {
      templates,
      sortKey,
      sortDirection,
      sortType,
      onFilterChange,
    } = this.props

    const sortedTemplates = this.memGetSortedResources(
      templates,
      sortKey,
      sortDirection,
      sortType
    )

    return sortedTemplates.map(t => (
      <TemplateCard
        key={`template-id--${t.id}`}
        template={t}
        onFilterChange={onFilterChange}
      />
    ))
  }
}
