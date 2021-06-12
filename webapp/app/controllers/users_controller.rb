class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.password = Digest::MD5.hexdigest(@user.password)
      @user.save
      render json: {},  status: :created
    else
      render json: {}, status: :not_acceptable
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
