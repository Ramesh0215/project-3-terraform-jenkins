resource "aws_ecr_repository" "app" {
    name = "ecs-cicd-repo"
    force_delete = true
}