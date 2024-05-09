export type Receiver = {
  "version": "0.1.0",
  "name": "receiver",
  "constants": [
    {
      "name": "MAINTAINERS_TAG",
      "type": "bytes",
      "value": "[109, 97, 105, 110, 116, 97, 105, 110, 101, 114, 115]"
    },
    {
      "name": "USER_DATA_TAG",
      "type": "bytes",
      "value": "[117, 115, 101, 114, 95, 100, 97, 116, 97]"
    },
    {
      "name": "ESCROW_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119]"
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
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userData",
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
          "name": "escrowKey",
          "type": "publicKey"
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
      "name": "receive",
      "accounts": [
        {
          "name": "userData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowKey",
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
          "name": "amount",
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
          "isMut": true,
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
      "name": "userData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": {
              "vec": {
                "defined": "User"
              }
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
      "name": "User",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Error: Unauthorized User!"
    },
    {
      "code": 6001,
      "name": "UnknownReceiver",
      "msg": "Error: Unknown Receiver!"
    }
  ]
};

export const IDL: Receiver = {
  "version": "0.1.0",
  "name": "receiver",
  "constants": [
    {
      "name": "MAINTAINERS_TAG",
      "type": "bytes",
      "value": "[109, 97, 105, 110, 116, 97, 105, 110, 101, 114, 115]"
    },
    {
      "name": "USER_DATA_TAG",
      "type": "bytes",
      "value": "[117, 115, 101, 114, 95, 100, 97, 116, 97]"
    },
    {
      "name": "ESCROW_TAG",
      "type": "bytes",
      "value": "[101, 115, 99, 114, 111, 119]"
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
          "name": "escrowKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userData",
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
          "name": "escrowKey",
          "type": "publicKey"
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
      "name": "receive",
      "accounts": [
        {
          "name": "userData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "escrowKey",
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
          "name": "amount",
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
          "isMut": true,
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
      "name": "userData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "users",
            "type": {
              "vec": {
                "defined": "User"
              }
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
      "name": "User",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Error: Unauthorized User!"
    },
    {
      "code": 6001,
      "name": "UnknownReceiver",
      "msg": "Error: Unknown Receiver!"
    }
  ]
};
