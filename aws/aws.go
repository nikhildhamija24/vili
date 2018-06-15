package aws

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ssm"
	"github.com/aws/aws-sdk-go/service/ssm/ssmiface"
)

// Client wraps other clients
type Client struct {
	SSM    ssmiface.SSMAPI
	Region string
}

// NewClient returns a configured AWSClient
func NewClient(region string) *Client {
	sess := session.New(&aws.Config{
		Region: aws.String(region),
	})

	ssmClient := ssm.New(sess)

	return &Client{
		SSM:    ssmClient,
		Region: region,
	}
}
