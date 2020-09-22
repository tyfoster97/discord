# Github Policy for Developers

## Branch Definitions

**master**
: the most recent stable release of _mombot

**dev**
: the stable developer version of _mombot

**bug#N**
: the branch for the bug with issue number N

**ftr#N**
: the branch for the feature associated with issue number N

**xxx#N-tsk#M**
: the branch for the task number M in the branch for issue N

**WARNING: ANY OTHER BRANCH NAMES ON THE ONLINE REPOSITORY WILL BE DELETED**

## Commit Rules

1. Commit messages should be under 30 characters
2. Commit messages should describe changes made
3. Details should be provided as needed for commits
4. Commit messages should begin with the branch name
5. No commits can occur on **master** nor **dev** branches.

### Pull Request & Merge Rules

1. Pull requests into **dev** and **master** require review
2. Merge conflicts should be handled by the person who wrote the code.
3. When an issue or feature branch is merged the main branch should be deleted
4. Code for task branches should be merged locally into the main branch for the task bug or feature
5. **Always** pull **dev** branch into issue branch before merging into **dev**
6. **Always** pull **master** into **dev** before merging into **master**

## Reviews

1. Reviews should be conducted by the person who is initiating the pull request
2. When possible a second developer should review the pull request before merging
3. Reviews should include a session on the test server using the specific issue branch bot