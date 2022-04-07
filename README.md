# Lu-common

![Node.js CI](https://github.com/BonnierNews/lu-common/workflows/Node.js%20CI/badge.svg)

Common repo with tools, config etc... designed for use in Data/Infra's repos

## Config

Everyone using our repos should add the following config to their local git to make life much easier:
```bash
git config --global --add submodule.recurse true
git config --global diff.submodule log
git config --global status.submoduleSummary true
```

Everyone using lu-common as a submodule need to initialize their .gitmodules file in that repo (e.g. in lu-greenfield)
```bash
git submodule update --init --recursive
```

## Usage (lu-greenfield)

To use the submodule in a new project in [lu-greenfield](https://github.com/BonnierNews/lu-greenfield) do the following:

- add the submodule:
```bash
cd <project directory>
git submodule add https://github.com/BonnierNews/lu-common.git ./common
```
- add the following lines to `.ohoy/hooks/pre-deploy.sh` see [customer-service-bff](https://github.com/BonnierNews/lu-greenfield/blob/master/customer-service-bff/.ohoy/hooks/pre-deploy.sh) for an example
```bash
if [ ! -f ./common/package.json ]; then
  echo "Looks like common submodule is missing, trying to resolve"
  git submodule update --init --recursive
fi

if [ ! -f ./common/package.json ]; then
  echo "Missing files in ./common"
  echo "Try running following command to resolve"
  echo "git submodule update --init --recursive --remote"
  exit 1
fi
```

## Usage (other repos)

In addition to the steps above for lu-greenfield, you'll need to create a new SSH key for the repo so it can access this one

- create a the key without a password
```bash
ssh-keygen -t rsa -b 4096 -f/Users/<user-name>/.ssh/<repo>_rsa -C"Submodule access for Github Action from <repo>"
```
- add the public key to [lu-common](https://github.com/BonnierNews/lu-common/settings/keys)'s deploy keys
- add the private key to your repo's `Secrets->Actions` with some epic name (see [lu-greenfield](https://github.com/BonnierNews/lu-greenfield/settings/secrets/actions) for an example `PULL_COMMON_SUBMODULE_KEY`
- add the following config to Github actions for Node CI (swap out `PULL_COMMON_SUBMODULE_KEY` to your epic name from above) (see [lu-greenfield](https://github.com/BonnierNews/lu-greenfield/blob/master/.github/workflows/nodejs.yml) for an example
```yaml
    - name: Lame private submodule workaround
      env:
        SSH_KEY_FOR_SUBMODULE: ${{secrets.PULL_COMMON_SUBMODULE_KEY}}
      run: |
        mkdir $HOME/.ssh && echo "$SSH_KEY_FOR_SUBMODULE" > $HOME/.ssh/id_rsa && chmod 600 $HOME/.ssh/id_rsa && git submodule update --init --recursive
```
- cross fingers

## Future

If we ever have multiple submodules then we'll need to modify the above yaml settings to just get the specific submodule. Probably it will work with something like `git submodule update --init --recursive ./customer-service-bff/common ./distribution-worker/common ./distribution-api/common` or something and then a whole other section (with separate ssh key) for the new submodule. May need to break that up into separate `git submodule update` commands for each subdirectory with the same submodule. Needs testing...
