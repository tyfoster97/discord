# Quality Policy

## Code Styling

1. Code should be easy to read
2. Spaces for tabs
3. Method stubs should have comments describing:
    - method summary
    - parameters
    - return values
    - *excludes object varaible getters and setters*
4. Files should have comments that:
    - describe file
    - list methods
    - list dependencies
5. Conditional statements should have comments describing what is being tested for

## Testing

1. All tests should be conducted on the test server with
        bash test.sh
2. Crash reports for testbot will be sent to the error logging channel
3. All functionality should be usable without error
4. Test must be complete before pull requests occur