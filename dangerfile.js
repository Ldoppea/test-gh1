import {danger, fail, message } from 'danger'

// Add a CHANGELOG entry for app changess
const hasChangelog = danger.git.modified_files.includes('CHANGELOG.md')
const skipChangelog = (danger.github.pr.body + danger.github.pr.title).includes('#nochangelog') || danger.github.issue.labels.some(label => label.name === 'nochangelog')

if (!hasChangelog) {
  if (skipChangelog) {
    message('No CHANGELOG detected by the PR but the #nochangelog flag is present')
  } else {
    fail('This PR does not include a CHANGELOG entry. Consider adding one or add #nochangelog to your PR title to state that it is intentional.')
  }
} else {
  message('CHANGELOG detected ✅')
}
