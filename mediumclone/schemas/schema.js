// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import post from './post'
import author from './author'
import comment from './comment'
import category from './category'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, author, category, blockContent, comment]),
})
