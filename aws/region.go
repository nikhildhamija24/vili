package aws

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/ec2metadata"
	"github.com/aws/aws-sdk-go/aws/session"
)

func getAWSRegion() (string, error) {
  var region string;

	svc := ec2metadata.New(session.New(aws.NewConfig()))
	region, err := svc.Region()
	if err != nil {
		return region, err
	}
	return region, nil
}
