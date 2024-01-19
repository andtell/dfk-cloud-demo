#!/bin/bash

clear
echo "Demo of starting a Virtual Machine (VM) on Azure using the Azure CLI from a bash environment"


read -n1 -rsp $'Press any key to continue...\n'

start=$(date +%s)

# az login

LOCATION=swedencentral
RESOURCE_GROUP=az_dfk_vm_rg
PASSWORD=S3cretInTheSauce

az group create --name $RESOURCE_GROUP --location $LOCATION

# az vm create \
#   --resource-group $RESOURCE_GROUP \
#   --name DfkDemoWinVM \
#   --image Win2022AzureEditionCore \
#   --admin-username demoadminuser \
#   --admin-password $PASSWORD \
#   --public-ip-address MyPublicIPWin \
#   --size Standard_DS1_v2

# WIN_VM_IP=$(az vm show -d --resource-group $RESOURCE_GROUP --name DfkDemoWinVM --query publicIps --output tsv)

# echo "Connecting to Windows VM @ $WIN_VM_IP"
# echo $PASSWORD | pbcopy


az vm create \
  --resource-group $RESOURCE_GROUP \
  --name DfkDemoLinuxVM \
  --image Ubuntu2204 \
  --admin-username demoadminuser \
  --admin-password $PASSWORD \
  --public-ip-address MyPublicIPLx \
  --size Standard_DS1_v2 

LINUX_VM_IP=$(az vm show -d --resource-group $RESOURCE_GROUP --name DfkDemoLinuxVM --query publicIps --output tsv)

echo "Connecting to Linux VM @ $LINUX_VM_IP"
echo $PASSWORD | pbcopy

end=$(date +%s)
echo "Elapsed Time: $(($end-$start)) seconds"

ssh demoadminuser@${LINUX_VM_IP}

# sudo snap install httpie
# http https://jsonplaceholder.typicode.com/users/1

az group delete --name $RESOURCE_GROUP --yes