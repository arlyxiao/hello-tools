class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email].downcase)
    if user && user.authenticate(params[:password])
      render json: {}, status: :ok
    else
      render json: {}, status: :forbidden
    end
  end

  def destroy
    log_out
    render json: {}, status: :ok
  end
end
