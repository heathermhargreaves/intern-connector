{
  "description": "Intern Community",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {
          "next": "split_intro",
          "event": "incomingMessage"
        },
        {
          "event": "incomingCall"
        },
        {
          "event": "incomingConversationMessage"
        },
        {
          "event": "incomingRequest"
        },
        {
          "event": "incomingParent"
        }
      ],
      "properties": {
        "offset": {
          "x": 0,
          "y": 0
        }
      }
    },
    {
      "name": "split_intro",
      "type": "split-based-on",
      "transitions": [
        {
          "next": "send_and_reply_2",
          "event": "noMatch"
        },
        {
          "next": "send_message_1",
          "event": "match",
          "conditions": [
            {
              "friendly_name": "If value equal_to sign up",
              "arguments": [
                "{{trigger.message.Body}}"
              ],
              "type": "equal_to",
              "value": "meet someone"
            }
          ]
        }
      ],
      "properties": {
        "input": "{{trigger.message.Body}}",
        "offset": {
          "x": -90,
          "y": 190
        }
      }
    },
    {
      "name": "send_message_1",
      "type": "send-message",
      "transitions": [
        {
          "next": "http_1",
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": 120,
          "y": 460
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "to": "{{contact.channel.address}}",
        "body": "Hello! We will send you an intern to meet shortly."
      }
    },
    {
      "name": "http_1",
      "type": "make-http-request",
      "transitions": [
        {
          "next": "set_variables_1",
          "event": "success"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": 150,
          "y": 720
        },
        "method": "GET",
        "content_type": "application/x-www-form-urlencoded;charset=utf-8",
        "url": "https://intern-connection-8885.twil.io/get_intern"
      }
    },
    {
      "name": "set_variables_1",
      "type": "set-variables",
      "transitions": [
        {
          "next": "send_and_reply_1",
          "event": "next"
        }
      ],
      "properties": {
        "variables": [
          {
            "value": "{{widgets.http_1.parsed.Name}}",
            "key": "Name"
          },
          {
            "value": "{{widgets.http_1.parsed.Team}}",
            "key": "Team"
          },
          {
            "value": "{{widgets.http_1.parsed.Bio}}",
            "key": "Bio"
          },
          {
            "value": "{{widgets.http_1.parsed.Slack}}",
            "key": "Slack"
          },
          {
            "value": "{{widgets.http_1.parsed.Fun_Fact}}",
            "key": "Fun_Fact"
          },
          {
            "value": "{{widgets.http_1.parsed.City}}",
            "key": "City"
          }
        ],
        "offset": {
          "x": 160,
          "y": 930
        }
      }
    },
    {
      "name": "send_and_reply_1",
      "type": "send-and-wait-for-reply",
      "transitions": [
        {
          "next": "split_1",
          "event": "incomingMessage"
        },
        {
          "event": "timeout"
        },
        {
          "event": "deliveryFailure"
        }
      ],
      "properties": {
        "offset": {
          "x": 170,
          "y": 1190
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "body": "Meet {{widgets.set_variables_1.Name}} who is on the {{widgets.set_variables_1.Team}}  team and is in {{widgets.set_variables_1.City}}!\n\nFun Fact: {{widgets.set_variables_1.Fun_Fact}}  \n\nWant to learn more?",
        "timeout": "3600"
      }
    },
    {
      "name": "split_1",
      "type": "split-based-on",
      "transitions": [
        {
          "event": "noMatch"
        },
        {
          "next": "send_message_2",
          "event": "match",
          "conditions": [
            {
              "friendly_name": "If value equal_to yes",
              "arguments": [
                "{{widgets.send_and_reply_1.inbound.Body}}"
              ],
              "type": "equal_to",
              "value": "yes"
            }
          ]
        }
      ],
      "properties": {
        "input": "{{widgets.send_and_reply_1.inbound.Body}}",
        "offset": {
          "x": 170,
          "y": 1470
        }
      }
    },
    {
      "name": "send_message_2",
      "type": "send-message",
      "transitions": [
        {
          "event": "sent"
        },
        {
          "event": "failed"
        }
      ],
      "properties": {
        "offset": {
          "x": 240,
          "y": 1760
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "to": "{{contact.channel.address}}",
        "body": "Here's a bit more about {{widgets.set_variables_1.Name}} : {{widgets.set_variables_1.Bio}}  \n\nReach out to them on Slack {{widgets.set_variables_1.Slack}} and say hi 👋 and get to know your favorite Twilion",
        "media_url": ""
      }
    },
    {
      "name": "send_and_reply_2",
      "type": "send-and-wait-for-reply",
      "transitions": [
        {
          "next": "split_intro",
          "event": "incomingMessage"
        },
        {
          "event": "timeout"
        },
        {
          "event": "deliveryFailure"
        }
      ],
      "properties": {
        "offset": {
          "x": -220,
          "y": 450
        },
        "service": "{{trigger.message.InstanceSid}}",
        "channel": "{{trigger.message.ChannelSid}}",
        "from": "{{flow.channel.address}}",
        "body": "Sorry we didn't recognize that. To meet a new intern, please respond with MEET SOMEONE.",
        "timeout": "3600"
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
