package api

import (
	"encoding/json"
	"net/http"

  "github.com/airware/vili/environments"
	"github.com/airware/vili/errors"
	"github.com/airware/vili/kube"
  "github.com/airware/vili/log"
	"github.com/airware/vili/templates"
	"github.com/labstack/echo"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// Create an AWS Client Interface
//awsClient := aws.NewClient("us-west-2")

func ssmparamGetSSMPathsHandler(c echo.Context) error {
  log.Info("handler ssmparamGetSSMPathsHandler()")
  env := c.Param("env")

  configmapName := c.Param("configmap")


	environment, err := environments.Get(env)
	if err != nil {
		return err
	}

	configmapTemplate, err := templates.ConfigMap(environment.Name, environment.Branch, configmapName)
	if err != nil {
		return err
	}
	configmap := new(corev1.ConfigMap)
	err = configmapTemplate.Parse(configmap)
	return c.JSON(http.StatusOK, configmap)
}

// endpoint := aws.NewClient("us-west-2").ConfigMaps()

func ssmparamSpecGetHandler(c echo.Context) error {
	env := c.Param("env")
	configmapName := c.Param("configmap")


	environment, err := environments.Get(env)
	if err != nil {
		return err
	}

	configmapTemplate, err := templates.ConfigMap(environment.Name, environment.Branch, configmapName)
	if err != nil {
		return err
	}
	configmap := new(corev1.ConfigMap)
	err = configmapTemplate.Parse(configmap)
	return c.JSON(http.StatusOK, configmap)
}

func ssmparamCreateHandler(c echo.Context) error {
	env := c.Param("env")
	configmapName := c.Param("configmap")

	endpoint := kube.GetClient(env).ConfigMaps()

	environment, err := environments.Get(env)
	if err != nil {
		return err
	}

	configmapTemplate, err := templates.ConfigMap(environment.Name, environment.Branch, configmapName)
	if err != nil {
		return err
	}
	configmap := new(corev1.ConfigMap)
	err = configmapTemplate.Parse(configmap)

	configmap, err = endpoint.Create(configmap)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, configmap)
}

func ssmparamDeleteHandler(c echo.Context) error {
	env := c.Param("env")
	configmapName := c.Param("configmap")

	endpoint := kube.GetClient(env).ConfigMaps()

	err := endpoint.Delete(configmapName, nil)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusNoContent) // TODO return status?
}

func ssmparamSetKeysHandler(c echo.Context) error {
	env := c.Param("env")
	configmapName := c.Param("configmap")

	endpoint := kube.GetClient(env).ConfigMaps()

	data := map[string]string{}
	err := json.NewDecoder(c.Request().Body).Decode(&data)
	if err != nil {
		return errors.BadRequest("Invalid body")
	}

	configmap, err := endpoint.Get(configmapName, metav1.GetOptions{})
	if err != nil {
		return err
	}
	for key, val := range data {
		configmap.Data[key] = val
	}
	configmap, err = endpoint.Update(configmap)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, configmap)
}

func ssmparamDeleteKeyHandler(c echo.Context) error {
	env := c.Param("env")
	configmapName := c.Param("configmap")
	key := c.Param("key")

	endpoint := kube.GetClient(env).ConfigMaps()

	configmap, err := endpoint.Get(configmapName, metav1.GetOptions{})
	if err != nil {
		return err
	}

	if _, ok := configmap.Data[key]; ok {
		delete(configmap.Data, key)
	}
	resp, err := endpoint.Update(configmap)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, resp)
}
