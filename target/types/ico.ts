export type Ico = {
  "version": "0.1.0",
  "name": "ico",
  "constants": [
    {
      "name": "CONFIG_TAG",
      "type": "bytes",
      "value": "[99, 111, 110, 102, 105, 103]"
    },
    {
      "name": "MAINTAINERS_TAG",
      "type": "bytes",
      "value": "[109, 97, 105, 110, 116, 97, 105, 110, 101, 114, 115]"
    },
    {
      "name": "WHITELIST_TAG",
      "type": "bytes",
      "value": "[119, 104, 105, 116, 101, 108, 105, 115, 116]"
    },
    {
      "name": "ESCROW_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119]"
    },
    {
      "name": "ESCROW_KEY_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119, 95, 107, 101, 121]"
    },
    {
      "name": "VAULT_TAG",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116]"
    }
  ],
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitParams"
          }
        }
      ]
    },
    {
      "name": "manageAdmin",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "addSubAdminAccounts",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "removeSubAdminAccounts",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "manangeWhitelistUsers",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          }
        },
        {
          "name": "users",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "transferTokens",
      "accounts": [
        {
          "name": "whitelist",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TransferParams"
          }
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateRoyalty",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateTokensPerSol",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tokensPerSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithSol",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateEscrow",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configuration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royalty",
            "docs": [
              "Royalty"
            ],
            "type": "u8"
          },
          {
            "name": "tokensPerSol",
            "docs": [
              "Token to be distributed per Sol"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "maintainers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "subAdmins",
            "docs": [
              "Sub Admins"
            ],
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "admin",
            "docs": [
              "Admin"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "whitelistedUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "escrowKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitParams",
      "docs": [
        "The struct containing instructions for initialisation"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royalty",
            "docs": [
              "Royalty"
            ],
            "type": "u8"
          },
          {
            "name": "tokensPerSol",
            "docs": [
              "Token to be distributed per Sol"
            ],
            "type": "u64"
          },
          {
            "name": "whitelists",
            "docs": [
              "Whitelist accounts"
            ],
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "TransferParams",
      "docs": [
        "The struct containing instructions for transferring tokens"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "toAccount",
            "docs": [
              "To Token"
            ],
            "type": "publicKey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens to be transferred"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WhitelistParams",
      "docs": [
        "The struct containing instructions for whitelisting"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User to be whitelisted"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateType",
      "docs": [
        "Update Type"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Add"
          },
          {
            "name": "Remove"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitEvent",
      "fields": [
        {
          "name": "admin",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAdmin",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "TransferEvent",
      "fields": [
        {
          "name": "from",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "to",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "BuyWithSolEvent",
      "fields": [
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "WhitelistEvent",
      "fields": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          },
          "index": false
        },
        {
          "name": "users",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "UpdateAdminEvent",
      "fields": [
        {
          "name": "from",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "to",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateSubAdminsEvent",
      "fields": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          },
          "index": false
        },
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "SetConfigEvent",
      "fields": [
        {
          "name": "royalty",
          "type": "u8",
          "index": false
        },
        {
          "name": "tokensPerSol",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateRoyaltyEvent",
      "fields": [
        {
          "name": "old",
          "type": "u8",
          "index": false
        },
        {
          "name": "new",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateTokensPerSolEvent",
      "fields": [
        {
          "name": "old",
          "type": "u64",
          "index": false
        },
        {
          "name": "new",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AmountCantBeZero",
      "msg": "Error: Amount can't be zero!"
    },
    {
      "code": 6001,
      "name": "Unauthorized",
      "msg": "Error: Unauthorized User!"
    },
    {
      "code": 6002,
      "name": "UnknownReceiver",
      "msg": "Error: Unknown Receiver!"
    }
  ]
};

export const IDL: Ico = {
  "version": "0.1.0",
  "name": "ico",
  "constants": [
    {
      "name": "CONFIG_TAG",
      "type": "bytes",
      "value": "[99, 111, 110, 102, 105, 103]"
    },
    {
      "name": "MAINTAINERS_TAG",
      "type": "bytes",
      "value": "[109, 97, 105, 110, 116, 97, 105, 110, 101, 114, 115]"
    },
    {
      "name": "WHITELIST_TAG",
      "type": "bytes",
      "value": "[119, 104, 105, 116, 101, 108, 105, 115, 116]"
    },
    {
      "name": "ESCROW_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119]"
    },
    {
      "name": "ESCROW_KEY_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119, 95, 107, 101, 121]"
    },
    {
      "name": "VAULT_TAG",
      "type": "bytes",
      "value": "[118, 97, 117, 108, 116]"
    }
  ],
  "instructions": [
    {
      "name": "init",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitParams"
          }
        }
      ]
    },
    {
      "name": "manageAdmin",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "addSubAdminAccounts",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "removeSubAdminAccounts",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "manangeWhitelistUsers",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          }
        },
        {
          "name": "users",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "transferTokens",
      "accounts": [
        {
          "name": "whitelist",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TransferParams"
          }
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateRoyalty",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "royalty",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updateTokensPerSol",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "caller",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tokensPerSol",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyWithSol",
      "accounts": [
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "config",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whitelist",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "solAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateEscrow",
      "accounts": [
        {
          "name": "maintainers",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "address",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "configuration",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royalty",
            "docs": [
              "Royalty"
            ],
            "type": "u8"
          },
          {
            "name": "tokensPerSol",
            "docs": [
              "Token to be distributed per Sol"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "maintainers",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "subAdmins",
            "docs": [
              "Sub Admins"
            ],
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "admin",
            "docs": [
              "Admin"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "whitelistedUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "escrowKey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "key",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitParams",
      "docs": [
        "The struct containing instructions for initialisation"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "royalty",
            "docs": [
              "Royalty"
            ],
            "type": "u8"
          },
          {
            "name": "tokensPerSol",
            "docs": [
              "Token to be distributed per Sol"
            ],
            "type": "u64"
          },
          {
            "name": "whitelists",
            "docs": [
              "Whitelist accounts"
            ],
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "TransferParams",
      "docs": [
        "The struct containing instructions for transferring tokens"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "toAccount",
            "docs": [
              "To Token"
            ],
            "type": "publicKey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens to be transferred"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "WhitelistParams",
      "docs": [
        "The struct containing instructions for whitelisting"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "User to be whitelisted"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "UpdateType",
      "docs": [
        "Update Type"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Add"
          },
          {
            "name": "Remove"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "InitEvent",
      "fields": [
        {
          "name": "admin",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "subAdmin",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "TransferEvent",
      "fields": [
        {
          "name": "from",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "to",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "BuyWithSolEvent",
      "fields": [
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "WhitelistEvent",
      "fields": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          },
          "index": false
        },
        {
          "name": "users",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "UpdateAdminEvent",
      "fields": [
        {
          "name": "from",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "to",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateSubAdminsEvent",
      "fields": [
        {
          "name": "updateType",
          "type": {
            "defined": "UpdateType"
          },
          "index": false
        },
        {
          "name": "addresses",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "SetConfigEvent",
      "fields": [
        {
          "name": "royalty",
          "type": "u8",
          "index": false
        },
        {
          "name": "tokensPerSol",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateRoyaltyEvent",
      "fields": [
        {
          "name": "old",
          "type": "u8",
          "index": false
        },
        {
          "name": "new",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateTokensPerSolEvent",
      "fields": [
        {
          "name": "old",
          "type": "u64",
          "index": false
        },
        {
          "name": "new",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AmountCantBeZero",
      "msg": "Error: Amount can't be zero!"
    },
    {
      "code": 6001,
      "name": "Unauthorized",
      "msg": "Error: Unauthorized User!"
    },
    {
      "code": 6002,
      "name": "UnknownReceiver",
      "msg": "Error: Unknown Receiver!"
    }
  ]
};
