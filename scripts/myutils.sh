ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_Attinad_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Attinad.example.com/peers/peer0.Attinad.example.com/tls/ca.crt
PEER0_ibm_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/ibm.example.com/peers/peer0.ibm.example.com/tls/ca.crt




  PEER=0
  ORG=1
  CORE_PEER_LOCALMSPID="AttinadMSP"
  PEER0_Attinad_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Attinad.example.com/peers/peer0.Attinad.example.com/tls/ca.crt
  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/Attinad.example.com/users/Admin@Attinad.example.com/msp
  CORE_PEER_ADDRESS=peer0.Attinad.example.com:7051
CORE_PEER_TLS_ENABLED = true
 peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt
 res=$?
 cat log.txt
 verifyResult $res "Channel creation failed"
 	echo "=========== Channel '$CHANNEL_NAME' created ==================="