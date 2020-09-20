# Quality Policy

## GitHub branches

### Branch rules

**master**
> Stable release of _mombot

**dev**
> Stable dev branch during sprints

**i#n**
> branch for issue #n

**f#n**
> branch for feature #n

### Commit Rules

- All commit messages should be under 80 characters and describe the changes made
- As needed, commits should have an description
- Commits to dev branch are allowed after test

### Pull Request & Merge Rules

- Pull request required for changes to master
- dev can have merge or pulls, merge commits for issue branches should close the issue
- Code should be locally tested before merging into dev
- Code should be develloped off of dev

### Code Quality

**style**
> Code style is maintained by babel, to format code for style run:

    npm run build

**comments**
- All method stubs should have comments
    - *excludes getters and setters*
- All files should have header comments
- As needed, lines of code should be commented
- All conditions should have comments

### Testing

> All tests must be conducted with the testbot
> The testbot server is invite only, all developers will be invited, ask a current dev for access
> To run tests use:
    bash test.sh
> This will run the testbot in node, not nodemon:
>> you will have to restart the test if any changes are made to files while testing
>> if the bot crashes you will have to manually restart the testbot

**All pull requests must be tested before merging**