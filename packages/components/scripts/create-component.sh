#!/bin/bash

usage="Usage: pnpm components:create [OPTIONS]...
Shorthand to create a new component in the project

Options:
  --name       The name of the component
  --help        Display this help and exit
"

component_name=""

# if [ "$(pwd | awk -F/ '{print $NF}')" != "ui" ]; then
#     echo -e "\033[31mError: Please run this script from the 'packages/ui' folder or the project root directory\033[39m"
#     exit 1
# fi

# Getting the component name
while [ $# -gt 0 ]; do
    case "$1" in
    --name=*)
        component_name="${1#*=}"
        ;;
    --help | -h)
        echo -e "\033[32m${usage}\033[39m"
        exit 0
        ;;
    *)
        component_name="${1#*=}"
        ;;
    esac
    shift
done

if [ -z "$component_name" ]; then
    echo -e "\033[31mError: Missing arguments\033[39m \n"
    echo -e "${usage}\n"
    exit 1
fi

base_dir=.
inter_file=${base_dir}/scripts/output
script_file=${base_dir}/scripts/modules/createComponent.ts

required_file=${base_dir}/scripts/libs/prettier.ts

echo -e "[          ] Setting up..."

# Generate a single typescript file containing the prettier function

if jiti $script_file "${component_name}"; then
    echo -e "\033[32m\nComponent ${component_name}.vue created successfully ✨\n\033[39m"

    # export the component
    echo -e "export * from \"./${component_name}\";" >>${base_dir}/src/components/index.ts
else
    echo -e "\033[31m\nError: Component creation failed\n\033[39m"
    # exit with error
    exit 1
fi

# # Step1: add the prettier function
# cat $required_file >${inter_file}.ts

# # Step2: add a blank line
# echo >>${inter_file}.ts

# # Step3: add the createComponent script, by removing the import of
# # prettier at the top of the file
# tail -n +2 $script_file >>${inter_file}.ts

# # transpile and rename
# tsc ${inter_file}.ts && cp ${inter_file}.js ${inter_file}.cjs

# # run...
# if node ${inter_file}.cjs "${component_name}"; then
#     echo -e "\033[32m\nComponent ${component_name} created successfully ✨\n\033[39m"
#     # clean up
#     rm ${inter_file}*

#     # export the component
#     echo -e "export * from \"./${component_name}\";" >>${base_dir}/src/components/index.ts
# else
#     echo -e "\033[31m\nError: Component creation failed\n\033[39m"
#     # clean up anyway and exit with error
#     rm ${inter_file}* && exit 1
# fi
