package aws

import (
  "strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ssm"
)

// DescribeParameters(*ssm.DescribeParametersInput) (*ssm.DescribeParametersOutput, error)
// DescribeParametersWithContext(aws.Context, *ssm.DescribeParametersInput, ...request.Option) (*ssm.DescribeParametersOutput, error)
// DescribeParametersRequest(*ssm.DescribeParametersInput) (*request.Request, *ssm.DescribeParametersOutput)
//
// DescribeParametersPages(*ssm.DescribeParametersInput, func(*ssm.DescribeParametersOutput, bool) bool) error
// DescribeParametersPagesWithContext(aws.Context, *ssm.DescribeParametersInput, func(*ssm.DescribeParametersOutput, bool) bool, ...request.Option) error


// ListImagesDetails returns data from all images stored in the repository identified
// by the given repository name.
// func (c *Client) GetParamsByPath(ssmParamPath string) ([]*ecr.ImageDetail, error) {
// 	images := []*ssm.GetParametersByPathOutput{}
//
// 	if ssmParamPath == "" {
// 		return params, nil
// 	}
//
// 	input := &ecr.DescribeImagesInput{
// 		RepositoryName: aws.String(repoName),
// 	}
//
// 	//GetParametersByPathWithContext(aws.Context, *ssm.GetParametersByPathInput, ...request.Option) (*ssm.GetParametersByPathOutput, error)
//
// 	err := c.SSM.GetParametersByPathWithContext(aws.Context, *ssm.GetParametersByPathInput, ...request.Option) bool
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	return images, nil
// }

// GetSSMParams gets parameters from SSM for the given parameter paths
func GetSSMParams(paramPaths []string) (map[string]string, error) {
	params := map[string]string{}
	if len(paramPaths) > 0 {
		awsConfig := aws.NewConfig().WithRegion("us-west-2")
    // sess := session.New(&aws.Config{
    //   Region: aws.String("us-west-2"),
    // })
		svc := ssm.New(session.New(awsConfig))

		for _, path := range paramPaths {
			err := svc.GetParametersByPathPages(&ssm.GetParametersByPathInput{
				Path:           aws.String(path),
				WithDecryption: aws.Bool(true),
				// Recursive:      aws.Bool(true),
			}, func(page *ssm.GetParametersByPathOutput, lastPage bool) bool {
				for _, param := range page.Parameters {
					key := strings.TrimPrefix(strings.TrimPrefix(*param.Name, path), "/")
					value := *param.Value
					if _, ok := params[key]; !ok {
						params[key] = value
					}
				}
				return true
			})
			if err != nil {
				return nil, err
			}
		}
	}
	return params, nil
}
